import githubIcon from '../../assets/github-icon-footer.png'


export default function Footer() {
    return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>LookingPlace ©</strong> hecho por equipo 5 de SoyHenry Cohorte FT-32B - 2023
        </p>
        <a href='https://github.com/felduque/lookingplace' target='_blank'>
          <img src={githubIcon} width='2%' height='2%' />
        </a> 
      </div>
   </footer>
    )
}
