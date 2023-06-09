import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';
import { useParams } from '../../node_modules/react-router-dom/dist/index';


const NewsPage = () => {
    // 카테고리가 선택되지 않았으면 기본 값으로 all 사용
    const params = useParams(); 
    const category = params.category || 'all';
    return (
        <>
        <Categories />
        <NewsList category={category} />
        </>
            
    );
};

export default NewsPage;