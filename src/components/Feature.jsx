const Feature = ({ children, src, title }) => {
    return ( 
        <div className='feature-item'>
        <img
          src={require(`../designs/img/${src}`)}
          alt='Chat Icon'
          className='feature-icon'
        />
        <h3 className='feature-item-title'>{title}</h3>
        <p>
         {children}
        </p>
      </div>
     );
}
 
export default Feature;