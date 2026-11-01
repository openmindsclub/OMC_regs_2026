import AdaptiveFrame from "../AdaptiveFrame";

const svg = `<svg width="285" height="73" viewBox="0 0 285 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="stroke0_10_122" fill="white">
<path d="M7.08212 23.9988L28.8854 3.9998H73.6395L79.951 0H150.525L155.689 4.5712H172.328L176.918 1.7142H209.623L214.213 5.714H283.639V40.5694L259.541 65.1396H158.558L153.967 61.7112H73.6395L67.328 68.568H16.8362L3.6395 56.5686L7.08212 23.9988ZM13.9674 27.4272L32.328 10.2852H278.476V39.998L255.525 58.2828H23.7215L13.9674 49.1404V27.4272Z" fill-rule="evenodd" clip-rule="evenodd"/>
</mask>
<path d="M7.08212 23.9988L28.8854 3.9998H73.6395L79.951 0H150.525L155.689 4.5712H172.328L176.918 1.7142H209.623L214.213 5.714H283.639V40.5694L259.541 65.1396H158.558L153.967 61.7112H73.6395L67.328 68.568H16.8362L3.6395 56.5686L7.08212 23.9988ZM13.9674 27.4272L32.328 10.2852H278.476V39.998L255.525 58.2828H23.7215L13.9674 49.1404V27.4272Z" stroke-width="1.51504" stroke="#33996B" mask="url(#stroke0_10_122)"/>
<mask id="stroke1_10_122" fill="white">
<path d="M31.64 10.288H275.608V38.29L255.611 57.72H24.2124L13.928 47.4335V28.0035L31.64 10.288Z"/>
</mask>
<path d="M31.64 10.288H275.608V38.29L255.611 57.72H24.2124L13.928 47.4335V28.0035L31.64 10.288Z" stroke-width="2.16" stroke="#006940" mask="url(#stroke1_10_122)"/>
<g filter="url(#filter0_d_10_122)">
<path d="M6.496 33.9115L9.35327 29.7892V50.9896L22.4967 62.7675H63.6413L59.0696 65.712H17.9251L6.496 53.934V33.9115ZM11.6391 22.7224L26.4968 8H84.785L88.2137 9.76669H28.2112L13.9249 24.4891L11.6391 22.7224ZM25.3539 12.7112H274.507H277.936H25.9254H25.3539ZM21.3538 56.8785H254.506L249.363 59.2341H22.4967L21.3538 56.8785Z" fill="#00F66A"/>
</g>
<defs>
<filter id="filter0_d_10_122" x="1.90735e-06" y="1.504" width="284.432" height="70.704" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="3.248"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.541176 0 0 0 0.313726 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_122"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_122" result="shape"/>
</filter>
</defs>
</svg>
`;

const cutoffs = {
    top: 12.75,
    bottom: 36,
    left: 86,
    right: 70,
};

export default function AboutUsFrameCTA(
    props: React.HTMLAttributes<HTMLDivElement>,
) {
    return (
        <AdaptiveFrame
            {...props}
            svg={svg}
            cutoffs={cutoffs}
            padding="12.75px 35px 21px 27.73px"
        >
            {props.children}
        </AdaptiveFrame>
    );
}
