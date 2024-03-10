import './Logo.css'

const Logo = ({width, height}) => {
    return (
      <div className='logo-container'>
          <img src="https://images.app.goo.gl/MkFLSPMk65VWTSfK8" alt="Compunentes" width={width}
          height={height} className='logo-imagen'/>
      </div>
    )
  }
  
  export default Logo