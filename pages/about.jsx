import React from 'react';

const aboutTitle = 'Tech-Hub is an online platform dedicated to providing the best gaming and tech accessories for players. Whether you\'re an avid gamer or just someone who appreciates the latest technology, we\'ve got you covered. Our mission is to make it easy for you to find the perfect products to enhance your gaming experience.';
const aboutLaptops = 'At Tech-Hub, we understand the importance of having a high-quality gaming laptop. That\'s why we\'ve carefully selected some of the best gaming laptops on the market to offer you the best gaming experience possible. From budget-friendly options to high-end models, we have something for everyone. Whether you\'re a casual gamer or a professional player, you\'re sure to find the perfect gaming laptop that fits your needs.';
const aboutAccessories = 'In addition to gaming laptops, we also offer a wide range of tech accessories for players. From the latest gaming mice and keyboards, to VR headset and controllers, we have everything you need to complete your gaming setup. We understand the importance of having the right accessories to get the most out of your gaming experience, which is why we only offer high-quality products from trusted brands.';
const aboutEnding = 'At Tech-Hub, we\'re committed to providing you with the best products and service. If you have any questions or need help finding the perfect gaming laptop or tech accessory, our team of experts is here to help. So why wait? Start shopping now and find the perfect products to take your gaming experience to the next level!';

function About() {
  return (
    <div className="about">
      <section className="about--introduction">
        <h1 className="about-title">About Tech-Hub</h1>
        <p>{aboutTitle}</p>
      </section>
      <hr />
      <section className="about--laptops">
        <h2>Gaming Laptops</h2>
        <p>{aboutLaptops}</p>
      </section>
      <hr />
      <section className="about--accessories">
        <h2>Tech Accessories</h2>
        <p>{aboutAccessories}</p>
      </section>
      <hr />
      <p>{aboutEnding}</p>
    </div>
  );
}

export default About;
