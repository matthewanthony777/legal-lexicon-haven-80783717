
import React, { useEffect } from 'react';

const DebugRender = () => {
  useEffect(() => {
    console.log("Debug component rendered");
    
    // Create a visible element to confirm rendering
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.top = '10px';
    debugElement.style.right = '10px';
    debugElement.style.backgroundColor = 'red';
    debugElement.style.color = 'white';
    debugElement.style.padding = '10px';
    debugElement.style.zIndex = '9999';
    debugElement.textContent = 'Debug: App is rendering';
    
    document.body.appendChild(debugElement);
    
    return () => {
      document.body.removeChild(debugElement);
    };
  }, []);
  
  return null;
};

export default DebugRender;
