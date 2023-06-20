import React,{useState,useRef,useEffect} from 'react'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);
    
    const [pwd,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);
    
    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user]);
    
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(user);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd]);

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd]);

    const handleSubmit = (e)=>{
      e.preventDefault();

      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if(!v1 || !v2){
        setErrMsg('Invalid Entry');
        return;
      }
    }

  return (
    <section className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center bg-gray-700 rounded-lg py-5 px-2">
        <p
          ref={errRef}
          className={
            errMsg ? "text-red-500 p-0.5 mb-0.5" : "absolute -left-full"
          }
          aria-live="assertive"
        >
          Error
        </p>
        <div className="w-full mb-5">
          <h1 className="text-center text-3xl text-white font-bold">
            Register
          </h1>
        </div>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className="flex flex-col w-full justify-center items-center p-3">
            <input
              type="text"
              ref={userRef}
              autoComplete='off'
              onChange={(e)=> setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={()=>setUserFocus(true)}
              onBlur={()=>setUserFocus(false)}
              className="w-full py-2.5 px-2 text-white outline-none mb-2 rounded-md bg-gray-600"
              placeholder="Username..."
            />
            <p id='uidnote' className={userFocus && user && !validName ? 'text-sm rounded-md bg-gray-600 w-full text-gray-200 p-2 transition-all duration-75':'absolute -left-full'}>
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <input
              type="password"
              className="w-full py-2.5 px-2 text-white outline-none mt-6 mb-2 rounded-md bg-gray-600"
              placeholder="Password..."
            />
            <input
              type="password"
              onChange={(e)=>setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby='confirmnote'
              onFocus={()=>setMatchFocus(true)}
              onBlur={()=>setMatchFocus(false)}
              className="w-full py-2.5 px-2 text-white outline-none mt-6 mb-2 rounded-md bg-gray-600"
              placeholder="Confirm Password..."
            />
            <a
              href="#"
              className="justify-start w-full py-1 text-blue-500 text-sm"
            >
              Already have an account? SignIn Here.
            </a>
          </div>

          <div className="w-full p-3 flex justify-center items-center">
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className="bg-blue-500 w-full py-2 rounded-md text-xl font-semibold text-white"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register
