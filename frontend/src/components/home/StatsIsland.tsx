
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Stat {
    number: string;
    label: string;
}

interface StatsIslandProps {
    stats: Stat[];
}

export default function StatsIsland({ stats }: StatsIslandProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Reveal Heading
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }

            // Animate Cards
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Bounce In
                gsap.fromTo(card,
                    { opacity: 0, y: 80, scale: 0.8 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.4)',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            once: true,
                        },
                    }
                );

                // Counter Animation
                const numberEl = card.querySelector('[data-stat-number]');
                const rawValue = numberEl?.getAttribute('data-value') || '';
                const match = rawValue.match(/(\d+)/);

                if (match && numberEl) {
                    const targetNum = parseInt(match[1]);
                    const suffix = rawValue.replace(/\d+/, '');
                    const counter = { val: 0 };

                    gsap.to(counter, {
                        val: targetNum,
                        duration: 2.5,
                        ease: 'expo.out',
                        delay: index * 0.15 + 0.4,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            once: true,
                        },
                        onUpdate: () => {
                            numberEl.textContent = `${Math.round(counter.val).toLocaleString('id-ID')}${suffix}`;
                        },
                        onComplete: () => {
                            numberEl.textContent = `${targetNum.toLocaleString('id-ID')}${suffix}`;
                            gsap.to(numberEl, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'back.out(2)' });
                        }
                    });
                }
            });

        }, containerRef); // Scope to container

        return () => ctx.revert();
    }, [stats]);

    return (
        <section class="py-16 md:py-20 bg-white" ref={containerRef}>
            <div class="w-full max-w-[1761px] mx-auto px-6 md:px-12 lg:px-[151px]">
                {/* Heading */}
                <div class="text-center mb-12 md:mb-14 px-2 md:px-4">
                    <h2
                        ref={titleRef}
                        class="opacity-0"
                    >
                        <span class="block text-[clamp(28px,6vw,70px)] font-light text-black leading-[1.15] md:leading-[1.1] tracking-[-0.02em] md:tracking-[-0.03em] mb-3 md:mb-2">
                            Rumah. Apartemen. Kantor. Semua bisa.
                        </span>
                        <span class="block text-[clamp(16px,3.5vw,32px)] font-light text-[#666] md:text-neutral-500 leading-[1.3] tracking-[-0.01em]">
                            Maksimalkan setiap meter ruang Anda.
                        </span>
                    </h2>
                </div>

                {/* Grid - Strictly Square Cards */}
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            ref={(el: HTMLDivElement | null) => cardsRef.current[index] = el}
                            class="bg-transparent border border-[#e5e5e5] md:border-2 md:border-black rounded-[24px] md:rounded-[35px] p-4 md:p-6 text-center stat-card transition-transform duration-300 ease-out hover:scale-105 flex flex-col items-center justify-center w-full aspect-square relative opacity-0"
                            data-stat-card
                        >
                            <div
                                class="text-[clamp(28px,4vw,56px)] font-light text-black mb-1 md:mb-2 leading-none"
                                style={{ letterSpacing: '-0.05em' }}
                                data-stat-number
                                data-value={stat.number}
                            >
                                0
                            </div>
                            <div
                                class="text-[14px] md:text-[18px] font-light text-[#666] md:text-black leading-tight tracking-[-0.5px] md:tracking-[-1.4px]"
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
