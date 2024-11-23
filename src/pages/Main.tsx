import { IconMainBottom, IconMainLogo } from '@/assets/icons';

export default function Main() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-yellow">
      <section className="relative flex flex-col gap-20pxr">
        <IconMainLogo />
        <p
          className="absolute -bottom-20pxr left-1/2 -translate-x-1/2 transform"
          style={{
            // TODO: 폰트 빼야함
            color: '#FFF',
            textShadow: '0px 4.086px 4.086px rgba(0, 0, 0, 0.30)',
            WebkitTextStrokeWidth: '1.0215054750442505px',
            WebkitTextStrokeColor: '#FFDB02',
            fontFamily: 'Hakgyoansim',
            fontSize: '45.242px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            letterSpacing: '-0.905px',
          }}
        >
          몽:글
        </p>
        <div className="absolute -bottom-70pxr">
          <IconMainBottom />
        </div>
      </section>
    </main>
  );
}
