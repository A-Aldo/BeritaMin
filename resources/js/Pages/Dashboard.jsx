import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { createInertiaApp } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { InertiaApp } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';




export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);


    // Buat Notif
    const [isNotif, setIsNotif] = useState(false);
    const [isDeleteNotif, setIsDeleteNotif] = useState(false);

    // Buat Apdet
    const [updateId, setUpdateId] = useState(null);
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [updateImage, setUpdateImage] = useState(null);


    const handleSubmit = () => {
        const data = {
            title, description, category, image
        }
        Inertia.post('/news', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        console.log('props', props)
        return
    }, [])



    const handleDelete = (newsId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            Inertia.delete(`/news/${newsId}`)
            setIsDeleteNotif(true) // Menampilkan alert


        }
    }

    const handleUpdate = (newsId) => {
        const formData = new FormData();
        formData.append('title', updateTitle);
        formData.append('author', props.auth.user.email);
        formData.append('description', updateDescription);
        formData.append('category', updateCategory);
        formData.append('image', updateImage);
    
        Inertia.put(`/news/${newsId}`, formData)
        .then((response) => {
            console.log('Response:', response); // Tampilkan respons dari permintaan
            // Berhasil diperbarui, reset state dan tampilkan notifikasi
            setUpdateId(null);
            setUpdateTitle('');
            setUpdateDescription('');
            setUpdateCategory('');
            setUpdateImage(null);
            setIsNotif(true);
        })
    };
    
    // console.log('prop last :', props)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {isNotif &&
                            <div className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Berita berhasil dibuat!</span>
                            </div>
                        }
                        {isDeleteNotif &&
                            <div className="alert alert-info">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Berita berhasil dihapus!</span>
                            </div>
                        }
                        <input type="text" placeholder="Judul" className="m-3 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} value={title} />
                        <input type="text" placeholder="Deskripsi" className="m-3 input input-bordered w-full " onChange={(description) => setDescription(description.target.value)} value={description} />
                        <input type="text" placeholder="Category" className="m-3 input input-bordered w-full " onChange={(category) => setCategory(category.target.value)} value={category} />
                        <input type="file" className="file-input m-3 file-input-bordered w-full max-w-xs" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>

                {/* Ini Buat Berita yang dibuat user */}
                <div className="py-12">
            {/* ... Form Input dan Notifikasi ... */}
            
            {/* Ini Buat Berita yang dibuat user */}
            <div className="p-4">
                {props.myNews && props.myNews.length > 0 ? (
                    props.myNews.map((news, i) => (
                        <div key={i} className="card w-full lg:w-1/4 m-3 bg-base-100 shadow-xl p-4 ">
                            {updateId === news.id ? (
                                <div>
                                    {/* Form Update */}
                                    <input className="m-3 input input-bordered w-full" type="text" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                                    <input className="m-3 input input-bordered w-full" type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                                    <input className="m-3 input input-bordered w-full" type="text" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)} />
                                    {/* <input className="m-3 input input-bordered w-full" type="text" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)} /> */}
                                    <input className="file-input m-3 file-input-bordered w-full max-w-xs" type="file" onChange={(e) => setUpdateImage(e.target.files[0])} />
                                    <button className="btn btn-primary m-3" onClick={() => handleUpdate(news.id)}>Simpan</button>
                                    <button className="btn btn-secondary" onClick={() => setUpdateId(null)}>Batal</button>
                                </div>
                            ) : (
                                <div>
                                    {/* Tampilan Berita */}
                                    <figure><img src={`${props.baseUrl}/${news.image_path}`} /> </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline">{news.category}</div>
                                            <button className="btn btn-secondary btn-sm ml-2" onClick={() => setUpdateId(news.id)}>Edit</button>
                                            <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(news.id)}>Hapus</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Anda Belum memiliki berita</p>
                )}
            </div>
        </div>
        </div>

        </AuthenticatedLayout>
    );
}


// return (
//     <AuthenticatedLayout
//         auth={props.auth}
//         errors={props.errors}
//         header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Berita Saya</h2>}
//     >
//         <Head title="Dashboard" />

        // <div className="py-12">
        //     {/* ... Form Input dan Notifikasi ... */}
            
        //     {/* Ini Buat Berita yang dibuat user */}
        //     <div className="p-4">
        //         {props.myNews && props.myNews.length > 0 ? (
        //             props.myNews.map((news, i) => (
        //                 <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl p-4 ">
        //                     {updateId === news.id ? (
        //                         <div>
        //                             {/* Form Update */}
        //                             <input type="text" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
        //                             <input type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
        //                             <input type="text" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)} />
        //                             <input type="file" onChange={(e) => setUpdateImage(e.target.files[0])} />
        //                             <button className="btn btn-primary" onClick={() => handleUpdate(news.id)}>Simpan</button>
        //                             <button className="btn btn-secondary" onClick={() => setUpdateId(null)}>Batal</button>
        //                         </div>
        //                     ) : (
        //                         <div>
        //                             {/* Tampilan Berita */}
        //                             <figure><img src={`${props.baseUrl}/${news.image_path}`} /> </figure>
        //                             <div className="card-body">
        //                                 <h2 className="card-title">
        //                                     {news.title}
        //                                 </h2>
        //                                 <p>{news.description}</p>
        //                                 <div className="card-actions justify-end">
        //                                     <div className="badge badge-inline">{news.category}</div>
        //                                     <button className="btn btn-secondary btn-sm ml-2" onClick={() => setUpdateId(news.id)}>Edit</button>
        //                                     <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(news.id)}>Hapus</button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     )}
        //                 </div>
        //             ))
        //         ) : (
        //             <p>Anda Belum memiliki berita</p>
        //         )}
        //     </div>
        // </div>
//     </AuthenticatedLayout>
// );
// }
