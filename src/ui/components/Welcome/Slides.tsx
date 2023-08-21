import React, { useState } from 'react';
import Slide from './Slide';
import { Button } from "@material-ui/core";



const Slides = () => {  

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Slides concluídos, faça algo aqui (por exemplo, feche o onboarding)
    }
  };

  const slides = [
    {
        title: 'Slide 1',
        content: 'Conteúdo do slide 1',
        image: 'LoginSlides/10.png',
        
      },
      {
        title: 'Slide 2',
        content: 'Conteúdo do slide 2',
        image: 'LoginSlides/12.png',
        
      },
      {
        title: 'Slide 3',
        content: 'Conteúdo do slide 3',
        image: 'LoginSlides/10.png',
        
      },
      {
        title: 'Slide 4',
        content: 'ultimo do slide 4',
        image: 'LoginSlides/12.png',
      }
    // Adicione mais slides conforme necessário
  ];


  return (
    <div>
      <Slide
        title={slides[currentSlide].title}
        content={slides[currentSlide].content}
        image={slides[currentSlide].image}
      />
      <Button onClick={handleNext}>Próximo</Button>
    </div>
  );
};

export default Slides;
