import React from 'react';
import './About.scss';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Nullam ac bibendum nisi. Integer nec arcu felis. Sed
          pellentesque sit amet odio et congue. Vivamus vestibulum mauris nec
          justo volutpat viverra. Quisque tempus nec felis sit amet fermentum.
        </p>
        <p>
          Maecenas sit amet nunc sed erat varius pretium a id neque. Sed ut
          faucibus magna. Fusce vitae turpis nibh. Aliquam gravida, magna ac
          viverra aliquet, ipsum risus consectetur enim, nec lobortis libero
          odio vel lectus. Nulla facilisi. Sed nec ante in felis fermentum
          rhoncus at eu libero. In hac habitasse platea dictumst. Donec
          vehicula ligula vel justo suscipit, sit amet ultricies eros aliquet.
        </p>
        <p>
          Donec nec massa leo. Aliquam erat volutpat. Vestibulum fermentum
          tempor ex, ut congue nunc pretium non. In ullamcorper, metus in
          pretium ullamcorper, mauris augue porta lacus, id vehicula odio est ut
          eros. Nulla facilisi. Nam commodo convallis nibh id vehicula. Fusce
          vulputate eu urna non pretium. Suspendisse fermentum, quam nec
          fermentum auctor, ligula lacus elementum tortor, non vulputate metus
          enim sed lectus.
        </p>
      </div>
    </div>
  );
};

export default About;
