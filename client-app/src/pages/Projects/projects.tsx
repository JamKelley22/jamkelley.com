import * as React from "react";

interface IProjectsProps {}

const Projects: React.FunctionComponent<IProjectsProps> = props => {
  return (
    <div>
      <h3>Other projects I've worked on</h3>
      <ul>
        <li>
          <a href="http://ratepoint.jamkelley.com/">RatePoint</a> |{" "}
          <a href="https://www.youtube.com/watch?v=6Fep0ocAJOc&t=343s">
            Demo Video
          </a>
        </li>
        <li>
          <a href="https://helptrain.space/">HelpTrain</a>
        </li>
        <li>
          <a href="https://coolslice-spass.herokuapp.com/">S-PASS</a>
        </li>
        <li>
          <a href="https://github.com/JamKelley22/Pentachoron">Pentachoron</a>
        </li>
        <li>
          <a href="https://bankeybags.com/">Bankey Bags</a>
        </li>
        <li>
          <a href="https://alarm.jamkelley.com/">Alarm.me</a>
        </li>
        <li>
          <a href="https://github.com/samstifter/punchclock">PunchClock</a>
        </li>
        <li>
          <a href="https://software.intel.com/en-us/ultimate-coder-vr/team4">
            VR Sprayer Sim
          </a>
        </li>
        <li>
          <a href="https://github.com/JamKelley22/Quizzer">Quizzer</a>
        </li>
        <li>
          Game Jams
          <ul>
            <li>
              <a href="https://globalgamejam.org/2019/games/wind-0">
                Spring 2019 - On the Wind
              </a>{" "}
              | <a href="https://github.com/JamKelley22/OnTheWind">GitHub</a>
            </li>
            <li>
              <a href="https://jamkelley22.itch.io/eternal-vapor">
                Fall 2018 - Eternal Vapor
              </a>{" "}
              |{" "}
              <a href="https://github.com/JamKelley22/eternal-vapor">Github</a>
            </li>
            <li>
              <a href="https://globalgamejam.org/2018/games/patient-zero-10">
                Spring 2018 - Patient Zero
              </a>{" "}
              |{" "}
              <a href="https://github.com/JamKelley22/GlobalGameJam2018">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://globalgamejam.org/2017/games/kfzoo">
                Spring 2017 - KFZoo
              </a>{" "}
              |{" "}
              <a href="https://github.com/JamKelley22/Game_Jam_Spring_2017">
                GitHub
              </a>
            </li>
          </ul>
        </li>
        <li>
          Game Clones
          <ul>
            <li>
              <a href="https://github.com/JamKelley22/Minesweeper_X">
                MinesweeperX
              </a>
            </li>
            <li>
              <a href="https://github.com/JamKelley22/Tic-Tac-Toe-JavaFX">
                Tic-Tac-ToeFX
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Projects;
