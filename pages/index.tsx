import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

// getServerSidePropsから渡されるpropsの型
type Props = {
    initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);  // 初期値を渡す
    const [loading, setLoading] = useState(false);  // 初期状態はfalseにしておく

    // マウント時に画像を読み込む宣言
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url); // 画像URLの状態を更新する
    //         setLoading(false); // ローディング状態を更新する
    //     });
    // }, []);

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

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

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
