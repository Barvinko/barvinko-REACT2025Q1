## 🔥 Анализ производительности (React Profiler)

### 🔥 Flame Graph

![Flame Graph Screenshot](<(image.png)>)

### 📊 Ranked Chart

![Ranked Chart Screenshot](./screenshots/ranked-chart.png)

### ⏳ Время фиксации

**Длительность фиксации:** 12.3ms  
**Продолжительность рендеринга:** 9.1ms  
**Компоненты, рендерящиеся дольше всего:** `Table`, `Row`, `Header`

### 🏎 Оптимизация `useMemo`

Без `useMemo`: **65ms**  
С `useMemo`: **8ms**

**Вывод:** После оптимизации время рендеринга уменьшилось более чем в 8 раз.
