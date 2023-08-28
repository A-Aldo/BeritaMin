import Newslist from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";
import Navbar from "@/Components/NavBar";
import { Link, Head } from "@inertiajs/react";


export default function Homepage(props) {
    console.log('prop', props)
    return (
        
        <div className="min-h-screen bg-slate-50">
            
            <Head title={props.title} />
            
            <Navbar user={props.auth.user}/>
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-6 p-10">
                {/* <Newslist news={props.news.data} /> */}
                <Newslist news={props.news.data} baseUrl={props.baseUrl} />
            </div>

            <div className="flex justify-center items-center">
                <Paginator meta={props.news.meta} />
            </div>
        </div>
    );
}

