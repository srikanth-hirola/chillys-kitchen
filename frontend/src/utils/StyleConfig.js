import { useSelector } from 'react-redux';


export const StyleConfig = () => {
    const { siteConfigData } = useSelector((state) => state.siteConfig);


    const styles = {
        bannerContent: siteConfigData?.bannerContent,
        
    };

    return styles;
}




