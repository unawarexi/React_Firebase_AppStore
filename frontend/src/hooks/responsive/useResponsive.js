
import React, { useEffect, useState } from "react";

function ResponsiveComponent() {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array means this effect will only run once after the component mounts
  
    return width; // return the width state
  }
  
  export default ResponsiveComponent;