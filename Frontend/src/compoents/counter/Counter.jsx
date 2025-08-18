import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const serviceProvider = [
    {
        name : "Furniture Assemblies",
        count : 300
    },
    {
        name : "Moving tasks",
        count : 500
    },
    {
        name : "Items mounted",
        count : 200  
    },
    {
        name : "Home Repairs:",
        count : 700  
    },
    {
        name : "Homes cleaned",
        count : 900
    }
]

export const Counter = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };

  }, []);

  return (
    <div className="container count-container mb-5 " ref={ref}>
        <div className="row">
            {
                serviceProvider.map((item, index) => (
                   
                    <div className="col" key={index} >
                         <h3 style={{color : "#f57c20"}} > {item.name} </h3>
                        <h4>
                             {isVisible && <CountUp end={item.count} />}+
                        </h4>
                    </div> 
                    
                ))
            }
        </div>
      
    </div>
  );
};
