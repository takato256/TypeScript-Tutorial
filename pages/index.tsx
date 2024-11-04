import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    // useStateを使って状態を定義する
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // マウント時に画像を読み込む宣言
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url); // 画像URLの状態を更新する
            setLoading(false); // ローディング状態を更新する
        });
    }, []);

    // ボタンをクリックした時に画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);   // 読み込み中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url);  // 画像URLの状態を更新する
        setLoading(false);  // 読み込み中フラグを倒す
    };

    // ボタンを押した時に画像を表示する
    return (
        <div>
            <button onClick={handleClick}>他のにゃんこも見る</button>
            <div>{loading || <img src={imageUrl} />}</div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
};

// 「async」はこの関数が非同期処理を行うことを示すもの
// fetchとres.jsonは非同期関数のため、これらの処理を待つ必要がある
const fetchImage = async (): Promise<Image> => {

    // HTTPリクエストでリソースを取得するブラウザ標準のAPI
    // 戻り値としてResponseオブジェクトを返す
    const res = await fetch("https://api.thecatapi.com/v1/images/search");

    // Responseオブジェクトのjson()メソッドを実行することで、レスポンスのボディーをJSONとしてパース
    const images = await res.json();

    console.log(images);
    return images[0];
};
