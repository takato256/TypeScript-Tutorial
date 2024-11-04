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
    // ローティング中でなければ、画像を表示する
    return <div>{loading || <img src={imageUrl} />}</div>
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
