import Image from "next/image";

const WhyChooseCard = () => {
  const content = [
    {
      title: "Expertise in Offbeat Destinations",
      description:
        "We specialize in showcasing the unexplored beauty of Northeast India, providing authentic experiences in untouched locations.",
      image: "/images/whychoose/expertise.png",
    },
    {
      title: "Tailored Experiences",
      description:
        "Every trip is curated with meticulous attention to detail, ensuring personalized itineraries that cater to your preferences",
      image: "/images/whychoose/tailored.png",
    },
    {
      title: "Community Support",
      description:
        "We actively contribute to rural development by creating job opportunities and promoting cultural tourism.",
      image: "/images/whychoose/community.png",
    },
    {
      title: "Seamless Planning",
      description:
        "From start to finish, our team ensures a hassle-free and memorable travel experience with reliable and innovative solutions.",
      image: "/images/whychoose/seamless.png",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:px-16 ">
      {content.map((item, index) => (
        <div
          key={index}
          className="w-full col-span-1 hover:bg-neutral-98  md:w-fit text-[#051E13] flex flex-row items-center hover:shadow-sm hover:shadow-primary gap-6 px-8 py-12 border border-primary rounded-lg transition-all duration-500 ease-in-out"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={180}
            height={180}
            className="rounded-full object-cover lg:object-contain lg:w-32 lg:h-32"
          />

          {/* Text Content */}
          <div className=" z-20 flex flex-col gap-6 justify-end">
            <p className="titlem md:titlel font-semibold z-30 text-black">
              {item.title}
            </p>
            <p className="bodys text-pretty text-black">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseCard;
