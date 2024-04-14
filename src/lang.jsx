import {lazy, Suspense} from "react";
import "./lang.css"

const CppLogo = lazy(() => import('./assets/languages/cpp.svg?react'));
const PythonLogo = lazy(() => import('./assets/languages/python.svg?react'));
const RustLogo = lazy(() => import('./assets/languages/rust.svg?react'));
const CLogo = lazy(() => import('./assets/languages/c.svg?react'));
const JSLogo = lazy(() => import('./assets/languages/js.svg?react'));
const JavaLogo = lazy(() => import('./assets/languages/java.svg?react'));
const SwiftLogo = lazy(() => import('./assets/languages/swift.svg?react'));
const CSLogo = lazy(() => import('./assets/languages/cs.svg?react'));
const HtmlLogo = lazy(() => import('./assets/languages/html.svg?react'));
const CSSLogo = lazy(() => import('./assets/languages/css.svg?react'));
const PHPLogo = lazy(() => import('./assets/languages/php.svg?react'));
const DartLogo = lazy(() => import('./assets/languages/dart.svg?react'));
const HaskellLogo = lazy(() => import('./assets/languages/haskell.svg?react'));
const ScalaLogo = lazy(() => import('./assets/languages/scala.svg?react'));
const ArduinoLogo = lazy(() => import('./assets/languages/arduino.svg?react'));
const FSLogo = lazy(() => import('./assets/languages/fs.svg?react'));
const GoLogo = lazy(() => import('./assets/languages/go.svg?react'));
const RubyLogo = lazy(() => import('./assets/languages/ruby.svg?react'));
const TSLogo = lazy(() => import('./assets/languages/ts.svg?react'));
const BashLogo = lazy(() => import('./assets/languages/bash.svg?react'));
const RLogo = lazy(() => import('./assets/languages/r.svg?react'));
const MATLABLogo = lazy(() => import('./assets/languages/matlab.svg?react'));
const KotlinLogo = lazy(() => import('./assets/languages/kotlin.svg?react'));
const PerlLogo = lazy(() => import('./assets/languages/perl.svg?react'));
const ObjCLogo = lazy(() => import('./assets/languages/objectivec.svg?react'));
const LuaLogo = lazy(() => import('./assets/languages/lua.svg?react'));
const SqlLogo = lazy(() => import('./assets/languages/sql.svg?react'));
const FortranLogo = lazy(() => import('./assets/languages/fortran.svg?react'));


export const cpp = <>
    <Suspense>
        <CppLogo/>
    </Suspense>
    <span className="pgrmicnsp">C++</span>
</>;

export const python = <>
    <Suspense>
        <PythonLogo/>
    </Suspense>
    <span className="pgrmicnsp">Python</span>
</>;

export const rust = <>
    <Suspense>
        <RustLogo/>
    </Suspense>
    <span className="pgrmicnsp">Rust</span>
</>;

export const c = <>
    <Suspense>
        <CLogo/>
    </Suspense>
    <span className="pgrmicnsp">C</span>
</>;

export const js = <>
    <Suspense>
        <JSLogo/>
    </Suspense>
    <span className="pgrmicnsp">JavaScript</span>
</>;

export const java = <>
    <Suspense>
        <JavaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Java</span>
</>;

export const swift = <>
    <Suspense>
        <SwiftLogo/>
    </Suspense>
    <span className="pgrmicnsp">Swift</span>
</>;

export const cs = <>
    <Suspense>
        <CSLogo/>
    </Suspense>
    <span className="pgrmicnsp">C#</span>
</>;

export const html = <>
    <Suspense>
        <HtmlLogo/>
    </Suspense>
    <span className="pgrmicnsp">HTML</span>
</>;

export const css = <>
    <Suspense>
        <CSSLogo/>
    </Suspense>
    <span className="pgrmicnsp">CSS</span>
</>;

export const php = <>
    <Suspense>
        <PHPLogo/>
    </Suspense>
    <span className="pgrmicnsp">PHP</span>
</>;

export const dart = <>
    <Suspense>
        <DartLogo/>
    </Suspense>
    <span className="pgrmicnsp">Dart</span>
</>;

export const haskell = <>
    <Suspense>
        <HaskellLogo/>
    </Suspense>
    <span className="pgrmicnsp">Haskell</span>
</>;

export const scala = <>
    <Suspense>
        <ScalaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Scala</span>
</>;

export const arduino = <>
    <Suspense>
        <ArduinoLogo/>
    </Suspense>
    <span className="pgrmicnsp">Arduino</span>
</>;

export const fs = <>
    <Suspense>
        <FSLogo/>
    </Suspense>
    <span className="pgrmicnsp">F#</span>
</>;

export const go = <>
    <Suspense>
        <GoLogo/>
    </Suspense>
    <span className="pgrmicnsp">Go</span>
</>;

export const ruby = <>
    <Suspense>
        <RubyLogo/>
    </Suspense>
    <span className="pgrmicnsp">Ruby</span>
</>;

export const ts = <>
    <Suspense>
        <TSLogo/>
    </Suspense>
    <span className="pgrmicnsp">TypeScript</span>
</>;

export const bash = <>
    <Suspense>
        <BashLogo/>
    </Suspense>
    <span className="pgrmicnsp">Bash</span>
</>;

export const r = <>
    <Suspense>
        <RLogo/>
    </Suspense>
    <span className="pgrmicnsp">R</span>
</>;

export const matlab = <>
    <Suspense>
        <MATLABLogo/>
    </Suspense>
    <span className="pgrmicnsp">MATLAB</span>
</>;

export const kotlin = <>
    <Suspense>
        <KotlinLogo/>
    </Suspense>
    <span className="pgrmicnsp">Kotlin</span>
</>;

export const perl = <>
    <Suspense>
        <PerlLogo/>
    </Suspense>
    <span className="pgrmicnsp">Perl</span>
</>;

export const objectivec = <>
    <Suspense>
        <ObjCLogo/>
    </Suspense>
    <span className="pgrmicnsp">Objective-C</span>
</>;

export const lua = <>
    <Suspense>
        <LuaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Lua</span>
</>;

export const assembly = <>
    <span className="pgrmicnsp">Assembly</span>
</>

export const basic = <>
    <span className="pgrmicnsp">BASIC</span>
</>

export const wlanguage = <>
    <span className="pgrmicnsp">WLangage</span>
</>

export const sql = <>
    <Suspense>
        <SqlLogo/>
    </Suspense>
    <span className="pgrmicnsp">SQL</span>
</>

export const fortran = <>
    <Suspense>
        <FortranLogo/>
    </Suspense>
    <span className="pgrmicnsp">Fortran</span>
</>


export const languages = [c, cpp, css, rust, go, bash, ts, python, arduino, scala, haskell, dart, swift, cs, fs, html, java, js, php, ruby, r, matlab, kotlin, objectivec, lua, assembly, basic, perl, wlanguage, sql, fortran]
export const languages_list = ["C", "C++", "CSS", 'Rust', "Go", "Bash", "TypeScript", "Python", "Arduino", "Scala", "Haskell", "Dart", "Swift", "C#", "F#", "HTML", "Java", "JavaScript", "PHP", "Ruby", "R", "MATLAB", "Kotlin", "Objective-C", "Lua", "Assembly", "BASIC", "Perl", "WLangage", "SQL", "Fortran"]

export const languageExtensions = {
    "C": ".c",
    "C++": ".cpp",
    "CSS": ".css",
    "Rust": ".rs",
    "Go": ".go",
    "Bash": ".sh",
    "TypeScript": ".ts",
    "Python": ".py",
    "Arduino": ".ino",
    "Scala": ".scala",
    "Haskell": ".hs",
    "Dart": ".dart",
    "Swift": ".swift",
    "C#": ".cs",
    "F#": ".fs",
    "HTML": ".html",
    "Java": ".java",
    "JavaScript": ".js",
    "PHP": ".php",
    "Ruby": ".rb",
    "R": ".r",
    "MATLAB": ".m",
    "Kotlin": ".kt",
    "Objective-C": ".m",
    "Lua": ".lua",
    "Assembly": ".asm",
    "BASIC": ".bas",
    "Perl": ".pl",
    "WLangage": ".wlangage",
    "SQL": ".sql",
    "Fortran": ".f90",
};

export function getLanguageName(input) {
    const index = languages_list.indexOf(input);
    if (index !== -1) {
        return languages[index];
    } else {
        return 'Language not found';
    }
}


