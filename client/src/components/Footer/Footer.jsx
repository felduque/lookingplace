import githubIcon from "../../assets/github-icon-footer.png";
import aboutUsicon from "../../assets/aboutUs-icon.png";

export default function Footer() {
  return (
    <footer className="footer" style={{ padding: "0" }}>
      <div className="content has-text-centered">
        <p>
          <strong>LookingPlace ©</strong> hecho por equipo 5 de SoyHenry Cohorte
          FT-32B - 2023
        </p>
        <a href="https://github.com/felduque/lookingplace" target="_blank">
          <img src={githubIcon} width="35px" height="35px" />
          
        </a>
        <a href="/aboutUs" target="_blank">
        <img src={aboutUsicon} width="35px" height="35px" />
        </a>
        
      </div>
    </footer>
  );
}
