const Background = () => {

return (

<div className="fixed inset-0 -z-10 overflow-hidden">

<div className="absolute -top-40 -left-40 h-96 w-96 bg-purple-300 opacity-30 blur-3xl animate-blob"></div>

<div className="absolute top-40 -right-20 h-96 w-96 bg-blue-300 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

<div className="absolute bottom-0 left-1/3 h-96 w-96 bg-pink-300 opacity-30 blur-3xl animate-blob animation-delay-4000"></div>

</div>

);

};

export default Background;