const isNews = ({ news, baseUrl }) => {
    return news.map((data, i) => {
        return (
            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl">
                <figure><img src={`${baseUrl}/${data.image_path}`} /> </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">{data.category}</div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        );
    });
};

const noNews = () => {
    console.log("No news")
    return (
        <div>Saat ini tidak ada berita tersedia</div>
    );
};

const Newslist = ({ news, baseUrl }) => {
    console.log(news);
    return !news ? noNews() : isNews({ news, baseUrl });
};

export default Newslist;
