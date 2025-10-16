import './chat.css'

function Sms(props: {textsms: string, colors: string}) {
  return (
    <div className='chatview'>
       <p style={{color: props.colors}}>{props.textsms}</p>
    </div>
  )
}


Sms.defaultProps = {
 colors : "#000"
};


export default Sms
