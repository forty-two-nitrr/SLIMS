import React from "react";
// import Typewriter from "typewriter-effect";
// import { Fade } from "react-awesome-reveal";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import config from "./config";
// import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
//   const particlesInit = useCallback(async (engine) => {
//     console.log(engine);
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     await console.log(container);
//   }, []);

  return (
    <div>
      <input type="checkbox" id="day-night" />
      <label for="day-night"></label>

      <div className="content">
        <div className="moon-sun"></div>

        <div className="cuboid floor one">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof one">
          <div className="side">
            <i className="cactus"></i>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor two">
          <div className="side">
            <span>
              <i className="flowers"></i>
            </span>
          </div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof two">
          <div className="side">
            <i className="bush"></i>
          </div>
          <div className="side"></div>
          <div className="side">
            <i className="bush"></i>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor three">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof three">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor four">
          <div className="side">
            <i className="man"></i>
          </div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof four">
          <div className="side">
            <i className="bush"></i>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor five">
          <div className="side">
            <i className="cactus2"></i>
            <i className="cactus2"></i>
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof five">
          <div className="side">
            <i className="cactus"></i>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor six">
          <div className="side">
            <span>
              <i className="cat"></i>
              <i className="cat"></i>
            </span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof six">
          <div className="side">
            <i className="bush"></i>
          </div>
          <div className="side"></div>
          <div className="side">
            <i className="cactus"></i>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor seven">
          <div className="side">
            <i className="plant"></i>
          </div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof seven">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid floor eight">
          <div className="side">
            <i className="plant"></i>
            <i className="man"></i>
          </div>
          <div className="side"></div>
          <div className="side">
            <span></span>
          </div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid roof eight">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid air-cooler">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="cuboid air-cooler">
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
          <div className="side"></div>
        </div>
        <div className="lights"></div>
        <div className="clouds"></div>
      </div>
      {/* <div className="left-text">
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
      </div> */}
      <div className="main_head">SLIMS.</div>
      <div className="main_desc">street light interface management system.</div>
      <div className="main_btn">
        <div class="wrap_x">
          <button class="button_n">EXPLORE!</button>
        </div>
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
