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

      const arrows = document.querySelectorAll('.arrow');
      arrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
          const projectOutline = arrow.closest('.project-outline');
          const details = projectOutline?.querySelector('.project-details');
          if (!details) return;

          const opened = details.classList.toggle('open');
          arrow.classList.toggle('active', opened);
        });
      });

      // Project description toggle functionality
      const projectBars = document.querySelectorAll('.project-bar');
      projectBars.forEach((bar) => {
        bar.addEventListener('click', () => {
          const projectContainer = bar.parentElement;
          const description = projectContainer.querySelector('.project-description');
          const svg = bar.querySelector('svg');
          
          if (!description) return;

          const isOpen = description.style.maxHeight && description.style.maxHeight !== '0px';
          
          if (isOpen) {
            // Close the description
            description.style.maxHeight = '0px';
            svg.style.transform = 'rotate(0deg)';
          } else {
            // Open the description
            description.style.maxHeight = description.scrollHeight + 'px';
            svg.style.transform = 'rotate(180deg)';
          }

          // Add smooth transition for svg rotation
          if (!svg.style.transition) {
            svg.style.transition = 'transform 0.3s ease-out';
          }
        });
      });

      // Navigation smooth scroll and highlight functionality
      const navItems = document.querySelectorAll('.nav-items');
      const highlight = document.getElementById('highlight');
      
      const sectionMap = {
        'About Me': 'aboutme',
        'Skills': 'skill-stack',
        'Projects': 'projects-section',
        'Contact Me': 'contact-section'
      };

      function updateHighlight(element) {
        const navLinks = document.getElementById('nav-links');
        const navItemsArray = Array.from(navItems);
        const index = navItemsArray.indexOf(element);
        
        if (index >= 0) {
          const itemWidth = element.offsetWidth;
          const itemLeft = element.offsetLeft;
          
          highlight.style.width = itemWidth + 'px';
          highlight.style.left = itemLeft + 'px';
        }
      }

      navItems.forEach((item) => {
        item.addEventListener('click', () => {
          const sectionId = sectionMap[item.textContent.trim()];
          const section = document.getElementById(sectionId);
          
          if (section) {
            // Smooth scroll to section
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update highlight position
            updateHighlight(item);
          }
        });
      });