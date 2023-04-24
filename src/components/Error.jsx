import Pullups from '../assets/pullups.gif';

const Error = () => {
  return (
    <div className='h-220px text-white bg-black text-2xl z-[999] py-4'>
        <img src={Pullups} className='h-[200px] w-[200px] object-contain' alt="cloud error image" />
        Error ocurred try again later..
    </div>
  )
}

export default Error