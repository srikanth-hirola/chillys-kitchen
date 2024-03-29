/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const CateringCounter = () => {
  const cards = [
    { image: '/images/home/customer.svg', label: 'Happy Customers', count: 95 },
    { image: '/images/home/chef.svg', label: 'Expert Chefs', count: 20 },
    { image: '/images/home/years.svg', label: 'Events Completed', count: 300 },
    { image: '/images/home/events.svg', label: 'Years Of Experience', count: 5 },
  ];

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Assuming you want to start the animation when the user scrolls to the component
      const element = document.querySelector('.catering-counter');
      if (element && window.scrollY + window.innerHeight >= element.offsetTop) {
        setStartAnimation(true);
      } else {
        setStartAnimation(false); // Reset animation if the component is no longer in view
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { number: number1 } = useSpring({
    reset: true,
    from: { number: 0 },
    number: startAnimation ? cards[0].count : 0,
    config: { duration: 2000 },
  });

  const { number: number2 } = useSpring({
    reset: true,
    from: { number: 0 },
    number: startAnimation ? cards[1].count : 0,
    config: { duration: 2000 },
  });

  const { number: number3 } = useSpring({
    reset: true,
    from: { number: 0 },
    number: startAnimation ? cards[2].count : 0,
    config: { duration: 2000 },
  });

  const { number: number4 } = useSpring({
    reset: true,
    from: { number: 0 },
    number: startAnimation ? cards[3].count : 0,
    config: { duration: 2000 },
  });

  return (
    <div className="catering-counter">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img src={cards[0].image} alt={cards[0].label} />
           
            <div className="counter">
              <animated.span>{number1.interpolate((val) => Math.floor(val))}</animated.span>%
            </div>
            <div className="label">{cards[0].label}</div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="card">
            <img src={cards[1].image} alt={cards[1].label} />
            <div className="counter">
              <animated.span>{number2.interpolate((val) => Math.floor(val))}</animated.span>+
            </div>
            <div className="label">{cards[1].label}</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <img src={cards[2].image} alt={cards[2].label} />
            <div className="counter">
              <animated.span>{number3.interpolate((val) => Math.floor(val))}</animated.span>+
            <div className="label">{cards[2].label}</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="card">
            <img src={cards[3].image} alt={cards[3].label} />
            <div className="counter">
              <animated.span>{number4.interpolate((val) => Math.floor(val))}</animated.span>+
            </div>
            <div className="label">{cards[3].label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringCounter;

