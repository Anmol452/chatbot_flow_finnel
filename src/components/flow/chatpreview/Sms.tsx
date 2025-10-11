import './chat.css'

function Sms(props: {textsms: string}) {
  return (
    <div className='chatview'>
       <p>{props.textsms}</p>
    </div>
  )
}

export default Sms
