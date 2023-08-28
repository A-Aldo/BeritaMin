<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Http\Resources\NewsCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(news::paginate(9));
        return Inertia::render('Homepage', [
            'title' => 'Yooo',
            'deskripsi' => 'Selamat datang di Info Min',
            'news' => $news,
            'baseUrl' => asset('storage/'),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;

        // Proses unggah gambar
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news_images', 'public');
            $news->image_path = $imagePath;
        }

        $news->save();
        return redirect()->back()->with('message', 'berita berhasil dibuat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */

    //  public function show(News $news)
    // {
    //     $myNews = $news::where('author', auth()->user()->email)->get();
    //     return Inertia::render('Dashboard', [
    //         'myNews' => $myNews,
    //     ]);
    // }

    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
            'baseUrl' => ('Storage/'),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    
     // public function update(Request $request, News $news)
    // {
    //     $news->title = $request->title;
    //     $news->description = $request->description;
    //     $news->category = $request->category;

    //     if ($request->hasFile('image')) {
    //         // Hapus gambar lama dari storage jika ada
    //         if ($news->image_path) {
    //             Storage::delete($news->image_path);
    //         }
    //         // Upload gambar baru ke storage
    //         $imagePath = $request->file('image')->store('news_images', 'public');
    //         $news->image_path = $imagePath;
    //     }

    //     $news->save();

    //     return redirect()->back()->with('message', 'Berita berhasil diperbarui');
    // }

    public function update(Request $request, News $news)
    {
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;

        if ($request->hasFile('image')) {
            // Hapus gambar lama dari storage jika ada
            if ($news->image_path) {
                Storage::delete($news->image_path);
            }
            // Upload gambar baru ke storage
            $imagePath = $request->file('image')->store('news_images', 'public');
            $news->image_path = $imagePath;
        }

        // Simpan perubahan tanpa mengubah 'author'
        $news->save();

        return redirect()->back()->with('message', 'Berita berhasil diperbarui');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */


    public function destroy($id)
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        }

        // Hapus file gambar dari storage
        if ($news->image_path) {
            Storage::delete($news->image_path);
        }

        $news->delete();

        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
}
