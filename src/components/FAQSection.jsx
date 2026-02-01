import React from 'react';
import { motion } from 'framer-motion';

const FAQSection = () => {
  const faqs = [
    {
      question: "Berapa lama proses dari konsultasi awal sampe selesai?",
      answer: "Terhitung Setelah Survey\nTahap Desain (konsep +3d + revisi) : 1-2 Minggu\nTerhitung Setelah Kesepakatan dengan DP 50%\nProduksi : 1-3 Minggu (tergantung Kesulitan & Banyaknya Pemesanan)\nTerhitung Setelah Pembayaran ke-2 (25%)\nPengiriman dan Instalasi : 1-2 Minggu.\nDan Serah Terima beserta Pembayaran akhir (25%)\nKami akan membuat Timeline detail setelah Kesepakatan Awal"
    },
    {
      question: "Apakah bisa melayani diluar Bogor?",
      answer: "Ya, Kami bisa melayani sampai se Jabodetabek."
    },
    {
      question: "Sistem Pembayaran Kita dibagi menjadi 3",
      answer: "DP 50% setelah kesepakatan dengan desain dan RAB\n25% pada saat produksi sudah jadi dan siap dikirim ke lokasi\n25% pada saat Kesepakatan serah terima"
    },
    {
      question: "Apakah ada Garansi?",
      answer: "Ya, Kami menyediakan garansi pemeliharaan selama 90 hari (3 bulan) setelah serah terima"
    },
    {
      question: "Apa bisa dengan budget terbatas?",
      answer: "Ya tentu saja, kami pastikan menyesuaikan budget dengan memberikan opsi yang pasti dan memberikan RAB yang sesuai"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
