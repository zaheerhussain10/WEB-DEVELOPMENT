import Card from "./Card";

function Tours({tours,removeTour}){
    return(
        <div className="container">
            <div>
                <h2 className="title">Plan With Love</h2>
            </div>
            <div className="cards">
                {
                    tours.map((tours) =>{
                        return <Card key={tours.id} removeTour={removeTour}{...tours}></Card>
                    })
                }
            </div>
        </div>
    );
}

export default Tours;