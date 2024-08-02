import HomePosts from "./HomePosts.jsx";


export default function Home() {

    return (
        <section className="home">
            <div className="home-sub home-content">
                <div className="variant-cont">
                    <div className="variant">
                        <p>Following</p>
                    </div>
                </div>
               
              <HomePosts />

            </div>
        </section>
    )
}

