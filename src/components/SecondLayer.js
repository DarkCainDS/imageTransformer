import ImageTransformer from './ImageTransformer';



export const SecondLayer = ({ name1, clan1 }) => {


  return (
    <div>
      <div>
      <h1>{name1 && clan1 ? `Welcome ${name1} from ${clan1}` : 'Welcome!!!'}</h1>
        
      </div>


      <ImageTransformer name2={name1} clan2={clan1} />
    </div>
  );
}