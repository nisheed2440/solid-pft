import type { Component } from 'solid-js';
import { PoseSittingComponents, PoseSittingImages } from '@solid-pft/core';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
      {PoseSittingImages.map((image: any) => <img src={image.src}/>)}
      <PoseSittingComponents.Bike />
    </div>
  );
};

export default App;
