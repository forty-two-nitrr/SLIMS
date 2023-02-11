import React, { useCallback } from "react";
import Typewriter from "typewriter-effect";
import { Fade } from "react-awesome-reveal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import config from "./config";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className="conatiner-home">
      <div className="left-text">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          className="particles"
          options={config.config}
        />
        <Fade cascade>
          <h1 className="intro">
            Hi <span className="wave-emoji">👋</span>, We Are Team{" "}
            <span className="green">Forty Two</span>
          </h1>
          <p className="intro-text">
            And we bring you smart street light system
          </p>
          <h1 className="typing">
            <Typewriter
              options={{
                strings: ["It's Efficient", "It's Power Saving"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className="btn-container">
            <Link to="/map">
              <button className="btn-home">Get Started</button>
            </Link>
          </div>
        </Fade>
      </div>
      <div className="right-image">
        <div className="lamp" id="short-1">
          <div id="post"></div>
          <div id="curve"></div>
          <div id="socket"></div>
        </div>
        <div className="lamp" id="tall-1">
          <div id="post"></div>
          <div id="curve"></div>
          <div id="socket"></div>
        </div>
        <div className="lamp" id="short-2">
          <div id="post"></div>
          <div id="curve"></div>
          <div id="socket"></div>
        </div>
        <div className="lamp" id="tall-2">
          <div id="post"></div>
          <div id="curve"></div>
          <div id="socket"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
