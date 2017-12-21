(defproject nextbus_chrome_extension "0.1.0-SNAPSHOT"
  :description "Chrome Extension That Tells me when my bus is coming"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
    [org.clojure/clojure "1.8.0"]
    [org.clojure/clojurescript "1.9.946"]
    [cljs-ajax "0.7.3"]
    [enfocus "2.1.1"]]
  :plugins[[lein-cljsbuild "1.1.7"]]
  :cljsbuild {
    :builds [{:source-paths ["src/cljs"]
              :compiler {
                :output-dir "public/out/"
                :output-to "public/out/main.js"
                ; :main "nextbus-loader.core"
                :optimizations :simple
                ; :asset-path "/"
              }
    }]
  }
)
