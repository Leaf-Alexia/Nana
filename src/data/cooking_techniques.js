// Tecnicas y temperaturas destiladas de "On Food and Cooking" (Harold McGee, 2004).
// Numeros concretos del libro; el PDF NO vive en el repo.
//
// Regla de destilado: solo entra lo que aparece con numero explicito en el texto.
// McGee da todo en Fahrenheit/Celsius pareados; aqui se conserva SU valor en Celsius.
// Si el libro daba un rango, se guarda `celsius` como el valor bajo (el util para
// el cocinero: "a partir de aqui pasa algo") y el rango completo se explica en `note`.

// Temperaturas clave de coccion. Todo en Celsius (el usuario es mexicano).
export const KEY_TEMPERATURES = [
  // --- Huevo (cap. 2) ---
  { id: 'egg-white-thicken', item: 'clara de huevo', celsius: 63, note: 'Empieza a espesar. La primera proteina en ceder es la ovotransferrina.' },
  { id: 'egg-white-set', item: 'clara de huevo', celsius: 65, note: 'Cuaja en un solido tierno.' },
  { id: 'egg-white-firm', item: 'clara de huevo', celsius: 80, note: 'Coagula la ovoalbumina y la clara se pone mucho mas firme. Pasarse de aqui la hace chiclosa.' },
  { id: 'egg-yolk-thicken', item: 'yema de huevo', celsius: 65, note: 'Empieza a espesar.' },
  { id: 'egg-yolk-set', item: 'yema de huevo', celsius: 70, note: 'Cuaja.' },
  { id: 'egg-whole-set', item: 'huevo entero batido', celsius: 73, note: 'Clara y yema mezcladas cuajan juntas.' },
  { id: 'egg-custard-set', item: 'huevo con leche (flan, natilla)', celsius: 78, note: 'Rango 78-80 C. La leche diluye las proteinas, asi que cuaja mas arriba que el huevo solo.' },
  { id: 'egg-hardboiled-water', item: 'agua para huevo duro', celsius: 80, note: 'Rango 80-85 C: hervor sin burbujas. Con agua hirviendo de verdad la clara sale de hule.' },
  { id: 'egg-long-cooked', item: 'huevo cocido largo (estilo hamindas)', celsius: 71, note: 'Rango estrecho 71-74 C: clara muy tierna y yema cremosa.' },

  // --- Carne (cap. 3) ---
  { id: 'meat-myosin-set', item: 'carne roja', celsius: 50, note: 'La miosina coagula: la carne pierde translucidez y se pone firme. Es el punto "rojo/rare".' },
  { id: 'meat-myoglobin-brown', item: 'carne roja', celsius: 60, note: 'La mioglobina se desnaturaliza y el color pasa de rosa a cafe grisaceo.' },
  { id: 'meat-collagen-squeeze', item: 'carne roja', celsius: 60, note: 'Rango 60-65 C: el colageno se encoge y exprime el jugo. La carne pierde un sexto de su volumen. Aqui deja de ser jugosa.' },
  { id: 'meat-collagen-gelatin', item: 'carne dura (chambarete, falda)', celsius: 70, note: 'El colageno empieza a disolverse en grenetina. De aqui para arriba, con tiempo, la carne se deshebra.' },
  { id: 'meat-tender-window', item: 'corte suave de carne', celsius: 55, note: 'Rango 55-60 C: minima perdida de jugo. La ventana jugosa mide apenas 15 C.' },
  { id: 'meat-safe-min', item: 'carne (seguridad)', celsius: 70, note: 'Minimo con termometro si se quiere garantizar destruccion de microbios. El color engaña.' },
  { id: 'meat-ecoli-kill', item: 'carne molida', celsius: 68, note: 'Temperatura a la que muere E. coli. Molida = el centro debe llegar aqui.' },
  { id: 'meat-danger-zone-low', item: 'zona de peligro bacteriano', celsius: 5, note: 'Entre 5 y 60 C las bacterias se multiplican rapido. No dejar carne ahi mas de dos horas.' },
  { id: 'meat-danger-zone-high', item: 'zona de peligro bacteriano', celsius: 60, note: 'Tope superior de la zona de peligro.' },
  { id: 'pork-trichinae-kill', item: 'cerdo (triquina)', celsius: 58, note: 'Basta para matar la triquina; apuntar a 65 C da margen. Ya no hace falta secar el cerdo.' },
  { id: 'leftovers-reheat', item: 'sobras de carne', celsius: 70, note: 'Recalentar al menos aqui. Si el guiso se recalienta suave, 65 C basta justo antes de servir.' },
  { id: 'meat-rest-target', item: 'carne asada en reposo', celsius: 50, note: 'Dejar bajar hasta aqui antes de rebanar: al enfriarse retiene mejor el jugo.' },
  { id: 'chicken-breast-max', item: 'pechuga de pollo', celsius: 68, note: 'Arriba de aqui se seca y se pone dura.' },
  { id: 'chicken-leg-min', item: 'pierna y muslo de pollo', celsius: 73, note: 'Debajo de aqui queda correosa: tiene mucho tejido conectivo.' },
  { id: 'braise-liquid', item: 'liquido de estofado o guiso', celsius: 80, note: 'Bien abajo del hervor. Hervir a borbotones aprieta las fibras y reseca la carne.' },

  // --- Pescado y mariscos (cap. 4) ---
  { id: 'fish-shrink', item: 'pescado', celsius: 50, note: 'Empieza a encogerse (la carne de res aguanta hasta 60 C).' },
  { id: 'fish-moist', item: 'pescado', celsius: 55, note: 'Rango 55-60 C: firme pero jugoso. Este es el punto.' },
  { id: 'fish-dry', item: 'pescado', celsius: 60, note: 'De aqui para arriba se empieza a secar.' },
  { id: 'fish-safe-min', item: 'pescado y marisco (seguridad)', celsius: 60, note: 'Minimo recomendado por seguridad. Arriba de 82 C ya no queda nada que salvar.' },
  { id: 'squid-quick', item: 'calamar y pulpo', celsius: 55, note: 'Rango 55-57 C: humedo y casi crujiente. A 60 C se enrosca y se pone duro; de ahi solo lo salva una hora de guiso.' },

  // --- Verduras y almidon (cap. 5, 6, 11) ---
  { id: 'veg-cells-collapse', item: 'verdura fresca', celsius: 60, note: 'Se rompen las membranas celulares: de crujiente pasa a flacida. Tambien aqui se opaca el verde en un salteado sin agua.' },
  { id: 'veg-firming-precook', item: 'papa, camote, betabel, zanahoria, frijol, coliflor, jitomate', celsius: 55, note: 'Rango 55-60 C por 20-30 min: precoccion que da firmeza permanente, aguanta hervores largos despues.' },
  { id: 'veg-firming-enzyme-off', item: 'verduras (enzima de firmeza)', celsius: 70, note: 'Arriba de aqui se inactiva la enzima que refuerza la pared celular; por eso la precoccion tiene que ser tibia.' },
  { id: 'potato-starch-gelation', item: 'almidon de papa', celsius: 58, note: 'Rango 58-66 C: los granulos absorben agua y se hinchan. Es lo que vuelve harinosa a la papa.' },
  { id: 'starch-gelation-general', item: 'almidon (para espesar)', celsius: 50, note: 'Rango 50-60 C segun la fuente: aqui arranca la gelatinizacion y la salsa empieza a espesar y a aclararse.' },
  { id: 'potato-gentle-boil', item: 'papa entera en agua', celsius: 80, note: 'Rango 80-85 C: basta para ablandar almidon y pared celular sin deshacer la orilla.' },
  { id: 'sweet-potato-maltose', item: 'camote', celsius: 57, note: 'La enzima que convierte almidon en maltosa arranca aqui y muere a 75 C. Hornear lento = camote mas dulce.' },
  { id: 'chlorophyllase-active', item: 'verdura verde', celsius: 66, note: 'Rango 66-77 C: maxima actividad de la clorofilasa, que hace que el verde se lave al agua. Solo se destruye cerca del hervor.' },
  { id: 'cabbage-enzyme-peak', item: 'col, brocoli, coliflor', celsius: 60, note: 'Pico de la enzima que genera el sabor azufrado. Calentar lento = sabor mas fuerte.' },
  { id: 'boiling-point', item: 'agua hirviendo', celsius: 100, note: 'Techo de cualquier metodo humedo al nivel del mar. Nada dorado pasa abajo de aqui.' },
  { id: 'pressure-cooker', item: 'olla express', celsius: 120, note: 'Contra 100 C de la olla normal. Corta el tiempo de frijol a la mitad o menos.' },
  { id: 'beans-gentle', item: 'frijol y leguminosas', celsius: 80, note: 'Rango 80-93 C: mas lento que el hervor pero no revienta la cascara ni deshace el grano.' },

  // --- Dorado y azucar (cap. 12, 14) ---
  { id: 'maillard-start', item: 'reaccion de Maillard', celsius: 120, note: 'De aqui para arriba el dorado corre a buen ritmo. Por eso solo dora la superficie seca.' },
  { id: 'sucrose-melt', item: 'azucar de mesa', celsius: 160, note: 'Empieza a fundirse.' },
  { id: 'caramel-start', item: 'azucar de mesa', celsius: 165, note: 'Rango 165-170 C: caramelizacion notoria.' },

  // --- Lacteos (cap. 1) ---
  { id: 'milk-whey-unfold', item: 'leche', celsius: 70, note: 'Se desdoblan las proteinas del suero. Es el punto donde se forma la nata y donde la leche empieza a pegarse al fondo.' },
  { id: 'butter-spreadable', item: 'mantequilla', celsius: 15, note: 'Se ablanda y se puede untar.' },
  { id: 'butter-melt', item: 'mantequilla', celsius: 30, note: 'Empieza a derretirse de verdad.' },
  { id: 'gelatin-melt', item: 'grenetina', celsius: 38, note: 'Empieza a derretirse: por eso una gelatina se deshace en la boca.' },
];

// Punto de humo de grasas: arriba de esta temperatura el aceite se degrada y amarga.
//
// ADVERTENCIA: McGee NO publica una tabla de punto de humo aceite por aceite.
// Solo da estas cuatro cifras (p. 37 y p. 802). Cualquier tabla larga que ande
// por internet no sale de este libro. Se prefiere corta y correcta.
export const SMOKE_POINTS = [
  { fat: 'aceite vegetal refinado y fresco', celsius: 230, bestFor: 'freir, sofrito fuerte, dorar' },
  { fat: 'grasa animal (manteca, sebo)', celsius: 190, bestFor: 'freir a fuego medio, refritos' },
  { fat: 'mantequilla entera', celsius: 120, bestFor: 'saltear suave; los solidos de la leche se queman aqui, mucho antes que la grasa' },
  { fat: 'mantequilla clarificada / ghee', celsius: 200, bestFor: 'freir y dorar; sin solidos de leche aguanta 80 C mas que la mantequilla entera' },
];

// Metodo recomendado por familia de ingrediente, con el porque.
// `minutes` solo lleva numero cuando McGee da un tiempo explicito; si no, va null.
export const TECHNIQUE_BY_INGREDIENT = [
  // --- Huevo ---
  { ingredient: 'huevo duro', method: 'agua a 80-85 C, sin burbujas', minutes: 12, why: 'De 10 a 15 minutos. Hervir a borbotones sobrecoagula la clara, la vuelve de hule y genera el anillo verde de sulfuro de fierro alrededor de la yema.' },
  { ingredient: 'huevo tibio', method: 'agua a 80-85 C, sin burbujas', minutes: 4, why: 'De 3 a 5 minutos: clara exterior apenas cuajada, clara interior lechosa, yema tibia.' },
  { ingredient: 'huevo mollet', method: 'agua a 80-85 C, sin burbujas', minutes: 6, why: 'De 5 a 6 minutos: yema semiliquida pero clara firme, se puede pelar entero.' },
  { ingredient: 'huevo revuelto', method: 'sarten a fuego bajo', minutes: null, why: 'El huevo entero cuaja a 73 C. Pasarse exprime el agua y separa la mezcla en grumos duros y suero.' },
  { ingredient: 'flan y natillas', method: 'baño maria', minutes: null, why: 'El agua no pasa de 100 C, asi que el baño amortigua y evita que la mezcla se corte. Un baño en molde de acero inoxidable llega a 80 C; uno de fierro vaciado a 87 C.' },

  // --- Carnes ---
  { ingredient: 'bistec y cortes suaves de res', method: 'sarten muy caliente o parrilla, rapido', minutes: null, why: 'Solo hasta 55-60 C. La ventana entre jugoso y seco mide 15 C, y en un corte de 2.5 cm el centro sube 5 C por minuto.' },
  { ingredient: 'chambarete, falda y cortes duros', method: 'estofado a 80 C, largo', minutes: null, why: 'El colageno se vuelve grenetina a partir de 70 C y necesita horas. Hervir a borbotones aprieta las fibras y las reseca sin acelerar nada.' },
  { ingredient: 'carne molida', method: 'bien cocida, centro a 68 C', minutes: null, why: 'Moler reparte por toda la masa lo que quiza era una contaminacion superficial. E. coli muere a 68 C.' },
  { ingredient: 'cerdo', method: 'a 65 C de centro', minutes: null, why: 'La triquina muere a 58 C; 65 C da margen de sobra. Secarlo hasta bien cocido es una costumbre vieja que ya no se justifica.' },
  { ingredient: 'pechuga de pollo', method: 'coccion corta, tope 68 C', minutes: null, why: 'Arriba de 68 C se seca y se endurece. La pierna necesita 73 C: por eso el pollo entero siempre sale desbalanceado.' },
  { ingredient: 'pierna y muslo de pollo', method: 'coccion mas larga, minimo 73 C', minutes: null, why: 'Debajo de 73 C queda correosa porque esta llena de tejido conectivo sin disolver.' },
  { ingredient: 'caldo y cocido de carne', method: 'a 80 C, tapado, sin hervor', minutes: null, why: 'Se necesitan 70-80 C para disolver el colageno, pero la fibra muscular ya se aprieta desde 60-65 C. El punto medio es un hervor perezoso.' },

  // --- Pescado y marisco ---
  { ingredient: 'filete de pescado', method: 'fuego bajo, centro a 55-60 C', minutes: null, why: 'Las proteinas del pescado son mas sensibles al calor que las de la res: encoge desde 50 C y se seca desde 60 C.' },
  { ingredient: 'atun y salmon', method: 'sellado por fuera, centro a 50 C', minutes: null, why: 'A 50 C siguen translucidos y gelatinosos, que es su mejor momento. Arriba de 55 C sus enzimas libres pegan las fibras entre si y se ponen secos.' },
  { ingredient: 'calamar y pulpo', method: 'o muy rapido a 55-57 C, o guiso de una hora', minutes: null, why: 'A 60 C el colageno se contrae y los enrosca. No hay termino medio: o antes del encogimiento, o despues de que el colageno ya se hizo grenetina.' },
  { ingredient: 'almeja, ostion y mejillon', method: 'coccion corta, minimo 60 C', minutes: null, why: '60 C es el minimo de seguridad; mas alla solo se encogen.' },
  { ingredient: 'pescado empapelado o tapado', method: 'horno o vapor en envoltura cerrada', minutes: null, why: 'Encerrarlo reduce el contacto de la superficie con el aire y evita que los vapores a pescado se esparzan por la cocina. Dejarlo enfriar tantito antes de abrir baja aun mas la volatilidad.' },

  // --- Verduras verdes ---
  { ingredient: 'brocoli', method: 'vapor u hervido corto en mucha agua', minutes: 6, why: 'Entre 5 y 7 minutos. Hervir lixivia pectina, calcio y vitaminas al agua, pero mucha agua diluye los acidos de la planta y protege el verde; el vapor conserva mas nutrientes pero deja la clorofila expuesta al acido de sus propias celulas.' },
  { ingredient: 'ejote', method: 'hervido en mucha agua hirviendo', minutes: 6, why: 'De 5 a 7 minutos. Piezas chicas y agua abundante para que no baje el hervor; sacar y pasar a agua con hielo para frenar la coccion y que no se apague el verde.' },
  { ingredient: 'chicharo', method: 'hervido corto en mucha agua', minutes: 5, why: 'Mismo principio que el ejote: el verde se opaca por acido y por tiempo, no por temperatura alta.' },
  { ingredient: 'espinaca', method: 'hervido muy corto o salteado rapido', minutes: null, why: 'El salteado es rapido pero expone la clorofila a los acidos de la propia celula; el agua abundante los diluye.' },
  { ingredient: 'col y repollo', method: 'hervido en mucha agua, corto', minutes: null, why: 'La enzima que genera el azufre pica a 60 C. Meterla de golpe a agua hirviendo la inactiva y deja los precursores intactos; la coccion larga forma trisulfuros, el olor de la col recocida.' },
  { ingredient: 'coliflor', method: 'hervido en mucha agua, corto', minutes: null, why: 'Misma familia que la col: prolongar la coccion la hace mas agresiva, no mas suave.' },
  { ingredient: 'verduras verdes en general', method: 'agua abundante, hirviendo fuerte, con sal', minutes: 6, why: 'Sal al 3% (2 cucharadas por litro) acelera el ablandamiento y evita que la verdura pierda sus propias sales y azucares al agua. Agua ligeramente alcalina (pH 7-8) conserva mejor el verde.' },

  // --- Raices y tuberculos ---
  { ingredient: 'papa hervida entera', method: 'arrancar en agua fria, subir a 80-85 C, sin sal', minutes: null, why: 'La subida lenta refuerza la pared celular de la orilla para que no se deshaga antes de que el centro se cueza. La sal apura el ablandamiento del exterior, justo lo que no se quiere aqui.' },
  { ingredient: 'papa frita', method: 'doble fritura', minutes: 10, why: 'Primero 8-10 min a 120-163 C para cocer el interior y disolver almidon superficial; luego 3-4 min a 175-190 C para dorar y hacer costra. Se puede prefreir con anticipacion y dar el golpe final al momento.' },
  { ingredient: 'papa en pure y al horno', method: 'variedad harinosa', minutes: null, why: 'Las papas harinosas sueltan sus celulas por separado, dan mucha superficie y absorben bien mantequilla y crema. Las cerosas se mantienen unidas: sirven para gratines y ensalada.' },
  { ingredient: 'camote', method: 'horneado lento', minutes: null, why: 'Su enzima convierte almidon en maltosa entre 57 y 75 C. Hornear lento le da mas tiempo de trabajar: sale mucho mas dulce que hervido, al vapor o en microondas.' },
  { ingredient: 'zanahoria', method: 'cocida (cualquier metodo)', minutes: null, why: 'Cocer rompe la pared celular y libera azucares al paladar: sabe bastante mas dulce cocida que cruda. Ademas mejora la absorcion de sus carotenos.' },
  { ingredient: 'betabel', method: 'cocido entero, sin pelar', minutes: null, why: 'Sus pigmentos son solubles en agua y manchan todo. Ademas guarda algo de textura crujiente incluso con coccion larga por sus acidos ferulicos.' },
  { ingredient: 'rabano y nabo', method: 'cocido hasta suave, no mas', minutes: null, why: 'Cocer inactiva la enzima del picor y saca el dulzor. Pero pasarse trae el sabor a col recocida y textura papilla.' },

  // --- Cebolla, ajo, jitomate, chile ---
  { ingredient: 'cebolla', method: 'sofrito lento en grasa', minutes: null, why: 'Su energia esta guardada como cadenas de fructosa, no almidon: la coccion larga las rompe y la vuelve francamente dulce. En grasa y a temperatura alta se generan mas volatiles y sabor mas fuerte.' },
  { ingredient: 'cebolla cruda picada', method: 'enjuagar despues de picar; enfriar antes', minutes: null, why: 'Los compuestos de azufre de la superficie cortada se vuelven mas agresivos con el aire. Meterla en agua con hielo 30-60 min frena la enzima que hace llorar y ademas ablanda la cascara para pelarla.' },
  { ingredient: 'ajo picado', method: 'agregar tarde, en mantequilla o grasa suave', minutes: null, why: 'El ajo produce cien veces mas productos de reaccion que sus parientes. En mantequilla los compuestos suaves persisten; en aceites vegetales insaturados se convierten en notas gomosas y punzantes.' },
  { ingredient: 'ajo entero', method: 'blanqueado o cocido entero', minutes: null, why: 'Blanquear el diente entero inactiva la enzima antes de que trabaje: sale poco picante, dulce y con notas a nuez.' },
  { ingredient: 'jitomate fresco', method: 'guardar a temperatura ambiente; cocer a salsa', minutes: null, why: 'Abajo de 13 C sufre daño por frio: color manchado, textura harinosa y sabor plano. Si ya se refrigero, dejarlo recuperar uno o dos dias afuera antes de usarlo.' },
  { ingredient: 'jitomate enlatado', method: 'revisar que no traiga calcio', minutes: null, why: 'Muchas enlatadoras agregan sales de calcio para que los trozos no se desbaraten: eso mismo impide que la salsa se deshaga en pure fino.' },
  { ingredient: 'chile y pimiento', method: 'asado directo al fuego', minutes: null, why: 'Su pared es delgada y hueca, asi que aguanta el golpe directo de calor para quemar la piel sin cocer de mas la carne.' },
  { ingredient: 'chile fresco (guardado)', method: 'no refrigerar abajo de 13 C', minutes: null, why: 'Como el jitomate, sufre daño por frio.' },

  // --- Granos y leguminosas ---
  { ingredient: 'frijol', method: 'coccion suave a 80-93 C, en poca agua', minutes: null, why: 'El hervor a borbotones rompe la cascara y deshace el grano. Y mientras mas agua, mas color, sabor y nutrientes se van al caldo: solo la justa para que la absorban.' },
  { ingredient: 'frijol (remojo)', method: 'remojo en agua con sal al 1%', minutes: null, why: 'Absorbe la mitad del agua en las primeras dos horas y se satura a las 10-12. La sal (2 cditas por litro) desplaza el magnesio de la pectina y acelera mucho la coccion; el mito de que "la sal endurece el frijol" es falso.' },
  { ingredient: 'frijol con jitomate o piloncillo', method: 'agregar el acido y el azucar al final', minutes: null, why: 'Acido, azucar y calcio refuerzan la pared celular y frenan el ablandamiento. Sirven para que no se deshaga, pero si entran al principio el frijol tarda muchisimo en suavizar.' },
  { ingredient: 'arroz', method: 'reposo tapado despues de cocer', minutes: 25, why: 'De 20 a 30 minutos. El reposo deja que el grano se enfrie tantito y se firme, para que no se rompa al servirlo.' },
  { ingredient: 'arroz aromatico', method: 'remojo previo', minutes: 25, why: 'De 20 a 30 minutos de remojo. Absorbe agua y acorta la coccion, lo que hace que se escape menos del aroma a palomita (acetilpirrolina), que es volatil y no se regenera.' },

  // --- Lacteos y grasas ---
  { ingredient: 'leche', method: 'calentar a fuego bajo, moviendo', minutes: null, why: 'Cerca de 70 C las proteinas del suero se desdoblan, forman nata y se pegan al fondo. La leche que ya empezo a agriarse se corta al calentarse.' },
  { ingredient: 'mantequilla para freir', method: 'clarificarla primero', minutes: null, why: 'Los solidos de la leche se queman a 120 C. Sin ellos aguanta hasta 200 C. Agregarle aceite NO mejora su tolerancia al calor; clarificarla si.' },

  // --- Metodos generales ---
  { ingredient: 'verdura al horno', method: 'aceitar antes, 160-190 C', minutes: null, why: 'La capa de aceite no se evapora como el agua, asi que todo el calor que absorbe sube la temperatura de la superficie: dora mas rapido y ademas el aceite participa en el dorado y aporta sabor propio.' },
  { ingredient: 'verdura frita o salteada', method: 'aceite a 160-190 C', minutes: null, why: 'El aceite es mucho mas denso que el aire, asi que choca con la comida mucho mas seguido: freir es mas rapido que hornear. La clave es que el tamaño de la pieza y la temperatura empaten para que el centro se cueza justo cuando la superficie ya doro.' },
];
