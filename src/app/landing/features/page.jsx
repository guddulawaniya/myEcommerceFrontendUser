import Image from 'next/image';
import img1 from '../../../assets/images/features1.png';
import img2 from '../../../assets/images/features2.png';
import img3 from '../../../assets/images/features3.png';
import img4 from '../../../assets/images/features4.png';
import img5 from '../../../assets/images/features5.png';
import img6 from '../../../assets/images/features6.png';

const refundData = [
  {
    src: img1,
    alt: 'Cancel Flight',
    title: 'Cancel your flight and get a full refund',
  },
  {
    src: img2,
    alt: 'Medical Refund',
    title: 'Medical Refund',
  },
  {
    src: img3,
    alt: 'Travel Sale',
    title: 'Coupon Codes',
  },
  {
    src: img4,
    alt: 'Easy Refund',
    title: 'Easy Refund',
  },
  {
    src: img5,
    alt: 'Lowest Fare Guarantee',
    title: 'Lowest Fare Guarantee',
  },
  {
    src: img6,
    alt: 'Best Travel Offer',
    title: 'New User Flat 10% Up to Rs 400/- off',
  },
];

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-27 p-8 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {refundData.map((item, idx) => (
          <div key={idx} className="relative shadow-md rounded-md overflow-visible">
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={250}
              className="w-full object-cover rounded-md"
            />
            <div className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-white px-4 py-4 text-md text-center font-bold shadow-md rounded-md w-[90%]">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}