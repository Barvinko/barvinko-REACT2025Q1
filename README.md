## 🔥 Performance analysis (React Profiler) 📊

### Performance of Region
**Action:** change the region to **"Americas"**
##### 🔥 Flame Graph
**before:**
![RegionSlow](./public/screenshot/RegionSlow.png)
**after:**
![RegionQuick](./public/screenshot/RegionQuick.png)

##### 📊 Ranked Chart
**before:**
![RegionRanckerSlow](./public/screenshot/RegionRanckerSlow.png)
**after:**
![RegionRanckerQuick](./public/screenshot/RegionRanckerQuick.png)

##### ⏳ Region result optimisation

**Render time before optimisation:** 5.2ms  
**Render time after optimisation** 0.8ms 

**Conclusion:** 
 - After optimisation, the rendering time decreased by more than **6.5 times.**
 - **CoutryCard** components are **not re-tenanted** after optimisation
 - Main component render time changed from 1.2ms to 0.2ms - **Main component render 6 times faster**

### Search
**Action:** enter **"g"** into the search input.
#### 🔥 Flame Graph
**before:**
![SearchSlow](./public/screenshot/SearchSlow.png)
**after:**
![SearchQuick](./public/screenshot/SearchQuick.png)

### 📊 Ranked Chart
**before:**
![SearchRankerSlow](./public/screenshot/SearchRankerSlow.png)
**after:**
![SearchRankerQuick](./public/screenshot/SearchRankerQuick.png)

##### ⏳ Search result optimisation

**Render time before optimisation:** 2.3ms  
**Render time after optimisation** 0.5ms 

**Conclusion:** 
 - After optimisation, the rendering time decreased by more than **4.6 times.**
 - **CoutryCard** components are **not re-tenanted** after optimisation
 - Main component render time changed from 0.2ms to 0.1ms - **Main component render 2 times faster**
