import Image from 'next/image';
import plane1 from '../../../assets/images/whysm1.png';
import plane2 from '../../../assets/images/whysm2.png';
import plane3 from '../../../assets/images/whysm3.png';
import plane4 from '../../../assets/images/whysm4.png';

export default function AboutSafemarg() {
  return (
    <>
    <div className="px-6 py-12 md:px-20 bg-white flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Overlapping Images */}
      <div className="relative w-[360px] h-[260px]">
        {/* Back image - plane in sky */}
        <Image
          src={plane1}
          alt="Plane in sky"
          fill
          className="shadow-lg object-cover absolute top-0 left-0 z-0"
          style={{ width: '100%', height: '100%' }}
        />
 
        {/* Front image - wing */}
        <div className="absolute top-16 left-66 z-10 w-[320px] h-[260px]">
          <Image
            src={plane2}
            alt="Plane wing"
            fill
            className="shadow-xl object-cover border-4 border-white"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Why Safemarg ?</h2>
        <p className="mb-3 text-gray-700">
          <span className="font-semibold">Safemarg</span> is a trusted name in India&apos;s online travel industry, known for offering a seamless and cost-effective air ticket booking experience. Whether you&apos;re planning a domestic trip or an international journey, Safemarg helps you save more with every flight booking.
        </p>
        <p className="mb-3 text-gray-700">
          Our platform offers exclusive deals, special discounts, and limited-time offers to ensure you get the best value for your money. Book easily through our website or download the Safemarg mobile app to reserve your flights anytime, anywhere.
        </p>
        <p className="text-gray-700">
          With a secure payment system, smooth booking process, and a user-friendly interface, Safemarg ensures that your travel planning is fast, safe, and stress-free.
        </p>
      </div>
    </div>

    <div className="px-6 py-12 md:px-20 bg-white flex flex-col md:flex-row items-center justify-between gap-12">

      {/* Text Section (Left Side) */}
      <div className="md:w-1/2 max-w-xl order-2 md:order-1">
        <h2 className="text-2xl font-bold mb-4">Flight Booking with Safemarg</h2>
        <p className="mb-3 text-gray-700">
          <span className="font-semibold">Safemarg</span> is a trusted name in India&apos;s online travel industry, known for offering a seamless and cost-effective air ticket booking experience. Whether you&apos;re planning a domestic trip or an international journey, Safemarg helps you save more with every flight booking.
        </p>
        <p className="mb-3 text-gray-700">
        What sets Safemarg apart is not just the unbeatable flight deals and discounts, but also the smooth, hassle-free booking experience it provides. From fast search results to instant confirmations, Safemarg makes the entire process effortless.
         </p>
        <p className="text-gray-700">
       Planning a trip soon? Try Safemarg and enjoy a flight booking experience that’s fast, secure, and tailored to save you money. With secure payment options, quick booking, and a reliable refund process, Safemarg stands out as your trusted travel partner. </p>
      </div>

      {/* Overlapping Images (Right Side) */}
      <div className="relative w-[360px] h-[260px] order-1 md:order-2">
        {/* Back image */}
        <Image
          src={plane3}
          alt="Plane in sky"
          fill
          className="shadow-lg object-cover absolute top-0 left-0 z-0"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Front overlapping image */}
        <div className="absolute top-16 right-66 z-10 w-[320px] h-[260px]">
          <Image
            src={plane4}
            alt="Plane wing"
            fill
            className="shadow-xl object-cover border-4 border-white"
          />
        </div>
      </div>
    </div>
    </>
  );
}