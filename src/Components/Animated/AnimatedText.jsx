import React from 'react'

const AnimatedText = ({text}) => {
   
        return (
          <p className="flex space-x-1 overflow-hidden">
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block animate-fade-slide"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {char}
              </span>
            ))}
          </p>
        );
}

export default AnimatedText