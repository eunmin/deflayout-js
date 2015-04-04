(defn create-attributes [attributes]
  (let [style (reduce #(str (name %1) ":" %2 ";") attributes)])
    (set-attribute "style" style))

(defn create-view [type attributes subviews]
  (let [view (create-element type (create-attributes attributes))]
    (reduce #(append-child view %) subviews)))

(defmacro div [attributes & subview-specs]
  `(create-view :div ~attributes ~@subview-spces))

(defmacro deflayout [layout]
  `(append-child document-body ~@layout))

(deflayout
  (div {:width 200 :height 300 :background "#f00"}
    (div {:width 200 :height 100 :background "#0f0"})
    (div {:width 200 :height 100 :background "#00f"})))
