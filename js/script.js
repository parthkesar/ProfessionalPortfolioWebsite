const words = ["Full-Stack Developer", "Software Developer", "Mobile App Developer"];
      const typewriter = document.getElementById("typewriter-effect");
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
          typewriter.textContent = currentWord.slice(0, ++charIndex);

          if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
          }
        } else {
          typewriter.textContent = currentWord.slice(0, --charIndex);

          if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
          }
        }

        setTimeout(typeEffect, isDeleting ? 60 : 100);
      }

      typeEffect();