const log = (value, type) => {
  const ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

  if(ENVIRONMENT === 'development'){
    if(type === 'info'){
      console.log(`%cinfo`,`color: green;background-color:LightGreen;padding: 3px 5px;`, value);
    }else{
      console.log(`%cerror`,`color: white;background-color:#ed162a;padding: 3px 5px;`, value);
    }
  }
};

export default log
