import React from "react";
export default function FieldNotesSection() {
  return (
    <section className="final-section field" id="field-notes">
      <header className="section-intro">
        <p>01 / Field notes</p>
        <h2>FIELD NOTES</h2>
        <span>
          Building thoughtful, useful interfaces that solve real problems.
        </span>
      </header>
      <div className="field-stack">
        <article className="panel experience">
          <h3>Experience</h3>
          <ol>
            <li>
              <span>2023—Now</span>
              <b>Global Payments</b>
              <small>Pune</small>
            </li>
            <li>
              <span>2021—23</span>
              <b>HashStudioz</b>
              <small>Noida</small>
            </li>
            <li>
              <span>2019—21</span>
              <b>Pibity</b>
              <small>Greater Noida</small>
            </li>
          </ol>
        </article>
        <article className="panel skills">
          <h3>Skills</h3>
          <div className="skill-list">
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Redux</span>
            <span>Sass</span>
            <span>Testing</span>
          </div>
        </article>
      </div>
    </section>
  );
}
