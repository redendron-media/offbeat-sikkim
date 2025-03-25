import Image from "next/image";


const WhyChooseCard = () => {
    const content =[
        {
            title: "Expertise in Offbeat Destinations",
            description: "We specialize in showcasing the unexplored beauty of Northeast India, providing authentic experiences in untouched locations.",
            image:"/images/north-sikkim/hero.webp"
        },
        {
            title: "Tailored Experiences",
            description: "Every trip is curated with meticulous attention to detail, ensuring personalized itineraries that cater to your preferences",
            image:"/images/goechala/1.webp"
        },
        {
            title: "Community Support",
            description: "We actively contribute to rural development by creating job opportunities and promoting cultural tourism.",
            image:"/images/dzukou-valley/5.webp"
        },
        {
            title: "Seamless Planning",
            description: "From start to finish, our team ensures a hassle-free and memorable travel experience with reliable and innovative solutions.",
            image:"/images/arunachal/1.webp"
        }
    ]
    return (
      <div className="flex flex-row gap-8 flex-wrap">  
      {
        content.map((item,index) => (
            <div key={index} className="w-[232px] md:w-[289px] lg:w-[292px] relative h-[400px] text-[#051E13] gap-2">
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="rounded-lg z-0 object-cover"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className=" absolute inset-0 z-10 rounded-lg" style={{
                 background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4), black)'
            }}/>
    
            {/* Text Content */}
            <div className="absolute gap-2 inset-0 px-5 py-6 z-20 flex flex-col justify-end">
              <p className="titlem md:titlel font-semibold z-30 text-white">
                {item.title}
              </p>
              <p className="bodys text-pretty text-[#F3FCF2]">
                {item.description}
              </p>
            </div>
          </div>
        ))
      }
       
      </div>
    );
  };
  
  export default WhyChooseCard;