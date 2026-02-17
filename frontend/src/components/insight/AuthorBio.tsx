import { useState, useEffect } from 'preact/hooks';
import { getAuthorById, getStrapiMedia } from '../../lib/strapi';

interface AuthorProps {
    authorId: number;
    initialAuthor: {
        name: string;
        job: string;
        bio: string;
        photo: string | null;
    };
}

const AuthorBio = ({ authorId, initialAuthor }: AuthorProps) => {
    const [author, setAuthor] = useState(initialAuthor);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLatestAuthor = async () => {
            if (!authorId) return;

            try {
                setLoading(true);
                const latestData = await getAuthorById(authorId);

                if (latestData && latestData.attributes) {
                    const authorAttr = latestData.attributes;
                    const authorPhoto = authorAttr.photo?.data ? getStrapiMedia(authorAttr.photo.data.attributes.url) : null;

                    setAuthor({
                        name: authorAttr.name,
                        job: authorAttr.job,
                        bio: authorAttr.bio,
                        photo: authorPhoto,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch dynamic author info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestAuthor();
    }, [authorId]);

    return (
        <div className={`mt-12 md:mt-14 lg:mt-16 pt-6 md:pt-7 lg:pt-8 border-t border-[#eee] transition-opacity duration-500 ${loading ? 'opacity-70' : 'opacity-100'}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 lg:gap-6 text-center sm:text-left">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 overflow-hidden relative">
                    {author.photo ? (
                        <img src={author.photo} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                        <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                    {loading && (
                        <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-[11px] md:text-[12px] font-bold text-[#999] uppercase tracking-wider mb-1">Tentang Penulis</p>
                    <h3 className="text-[18px] md:text-[20px] font-bold text-black mb-1.5 md:mb-2">{author.name}</h3>
                    <p className="text-[13px] md:text-[14px] text-[#888] mb-1.5 md:mb-2">{author.job}</p>
                    <div className="text-[14px] md:text-[15px] lg:text-[16px] text-[#666] leading-relaxed">
                        {author.bio}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorBio;
