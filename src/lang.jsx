import "./lang.css"
import {lazy, Suspense} from "react";


const CppLogo = lazy(() => import('./assets/languages/cpp.svg?react'));

export const cpp = <>
    <Suspense>
        <CppLogo/>
    </Suspense>
    <span className="pgrmicnsp">C++</span>
</>


const PythonLogo = lazy(() => import('./assets/languages/python.svg?react'));
export const python = <>
    <Suspense>
        <PythonLogo/>
    </Suspense>
    <span className="pgrmicnsp">Python</span>
</>


const RustLogo = lazy(() => import('./assets/languages/rust.svg?react'));
export const rust = <>
    <Suspense>
        <RustLogo/>
    </Suspense>
    <span className="pgrmicnsp">Rust</span>
</>

const CLogo = lazy(() => import('./assets/languages/c.svg?react'));
export const c = <>
    <Suspense>
        <CLogo/>
    </Suspense>
    <span className="pgrmicnsp">C</span>
</>


const JSLogo = lazy(() => import('./assets/languages/js.svg?react'));
export const js = <>
    <Suspense>
        <JSLogo/>
    </Suspense>
    <span className="pgrmicnsp">JavaScript</span>
</>


const JavaLogo = lazy(() => import('./assets/languages/java.svg?react'));
export const java = <>
    <Suspense>
        <JavaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Java</span>
</>


const SwiftLogo = lazy(() => import('./assets/languages/swift.svg?react'));
export const swift = <>
    <Suspense>
        <SwiftLogo/>
    </Suspense>
    <span className="pgrmicnsp">Swift</span>
</>


const CSLogo = lazy(() => import('./assets/languages/cs.svg?react'));
export const cs = <>
    <Suspense>
        <CSLogo/>
    </Suspense>
    <span className="pgrmicnsp">C#</span>
</>


const HtmlLogo = lazy(() => import('./assets/languages/html.svg?react'));
export const html = <>
    <Suspense>
        <HtmlLogo/>
    </Suspense>
    <span className="pgrmicnsp">HTML</span>
</>


const CSSLogo = lazy(() => import('./assets/languages/css.svg?react'));
export const css = <>
    <Suspense>
        <CSSLogo/>
    </Suspense>
    <span className="pgrmicnsp">CSS</span>
</>


const PHPLogo = lazy(() => import('./assets/languages/php.svg?react'));
export const php = <>
    <Suspense>
        <PHPLogo/>
    </Suspense>
    <span className="pgrmicnsp">PHP</span>
</>

const DartLogo = lazy(() => import('./assets/languages/dart.svg?react'));
export const dart = <>
    <Suspense>
        <DartLogo/>
    </Suspense>
    <span className="pgrmicnsp">Dart</span>
</>

const HaskellLogo = lazy(() => import('./assets/languages/haskell.svg?react'));
export const haskell = <>
    <Suspense>
        <HaskellLogo/>
    </Suspense>
    <span className="pgrmicnsp">Haskell</span>
</>


const ScalaLogo = lazy(() => import('./assets/languages/scala.svg?react'));
export const scala = <>
    <Suspense>
        <ScalaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Scala</span>
</>


const ArduinoLogo = lazy(() => import('./assets/languages/arduino.svg?react'));
export const arduino = <>
    <Suspense>
        <ArduinoLogo/>
    </Suspense>
    <span className="pgrmicnsp">Arduino</span>
</>

const FSLogo = lazy(() => import('./assets/languages/fs.svg?react'));
export const fs = <>
    <Suspense>
        <FSLogo/>
    </Suspense>
    <span className="pgrmicnsp">F#</span>
</>

const GoLogo = lazy(() => import('./assets/languages/go.svg?react'));
export const go = <>
    <Suspense>
        <GoLogo/>
    </Suspense>
    <span className="pgrmicnsp">Go</span>
</>


const RubyLogo = lazy(() => import('./assets/languages/ruby.svg?react'));
export const ruby = <>
    <Suspense>
        <RubyLogo/>
    </Suspense>
    <span className="pgrmicnsp">Ruby</span>
</>


const TSLogo = lazy(() => import('./assets/languages/ts.svg?react'));
export const ts = <>
    <Suspense>
        <TSLogo/>
    </Suspense>
    <span className="pgrmicnsp">TypeScript</span>
</>


const BashLogo = lazy(() => import('./assets/languages/bash.svg?react'));
export const bash = <>
    <Suspense>
        <BashLogo/>
    </Suspense>
    <span className="pgrmicnsp">Bash</span>
</>

const RLogo = lazy(() => import('./assets/languages/r.svg?react'));
export const r = <>
    <Suspense>
        <RLogo/>
    </Suspense>
    <span className="pgrmicnsp">R</span>
</>

const MATLABLogo = lazy(() => import('./assets/languages/matlab.svg?react'));
export const matlab = <>
    <Suspense>
        <MATLABLogo/>
    </Suspense>
    <span className="pgrmicnsp">MATLAB</span>
</>


const KotlinLogo = lazy(() => import('./assets/languages/kotlin.svg?react'));
export const kotlin = <>
    <Suspense>
        <KotlinLogo/>
    </Suspense>
    <span className="pgrmicnsp">Kotlin</span>
</>


const PerlLogo = lazy(() => import('./assets/languages/perl.svg?react'));
export const perl = <>
    <Suspense>
        <PerlLogo/>
    </Suspense>
    <span className="pgrmicnsp">Perl</span>
</>


const ObjCLogo = lazy(() => import('./assets/languages/objectivec.svg?react'));
export const objectivec = <>
    <Suspense>
        <ObjCLogo/>
    </Suspense>
    <span className="pgrmicnsp">Objective-C</span>
</>

const LuaLogo = lazy(() => import('./assets/languages/lua.svg?react'));
export const lua = <>
    <Suspense>
        <LuaLogo/>
    </Suspense>
    <span className="pgrmicnsp">Lua</span>
</>

export const assembly = <>
    <span className="pgrmicnsp">Assembly</span>
</>

export const basic = <>
    <span className="pgrmicnsp">BASIC</span>
</>

export const languages = [c, cpp, css, rust, go, bash, ts, python, arduino, scala, haskell, dart, swift, cs, fs, html, java, js, php, ruby, r, matlab, kotlin, objectivec, lua, assembly, basic, perl]
export const languages_list = ["C", "C++", "CSS", 'Rust', "Go", "Bash", "TypeScript", "Python", "Arduino", "Scala", "Haskell", "Dart", "Swift", "C#", "F#", "HTML", "Java", "JavaScript", "PHP", "Ruby", "R", "MATLAB", "Kotlin", "Objective-C", "Lua", "Assembly", "BASIC", "Perl"]
