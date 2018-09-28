$(document).ready(function(){
	
	//add .head-style  to desired divs!!!!!!!!!!!!!!
	
	var wallURL = [
	    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjMtl9M8g5BwuOBIWTWCcAVJFLeiGWifLEYl8i2JakRBXXZto',
	
	    'http://www.prideinmcalester.com/wp-content/uploads/2016/10/webtreats-seamless-web-background-primary-green-pattern-2-flickr-94133.jpg', //green
		'https://image.freepik.com/free-vector/yellow-swirls-pattern_1040-37.jpg',  //yellow
		'https://i.stack.imgur.com/P8Sda.png', //gradient
		
	    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsQf2-zwuStKf6u2V2HE_nCy9rRvk5M8ag043FAenQbOrCXY3tA', //violat blocks
		'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Color_icon_purple.svg/2000px-Color_icon_purple.svg.png', //same in HD
		'http://www.sensationalcolor.com/wp-content/uploads/2009/12/purple350x350.jpg', //same HD
		'http://www.color-hex.com/palettes/1835.png',   //!!!!!
		'http://paperlief.com/images/blue-purple-gradient-wallpaper-2.jpg',  //puprle gradient
		'http://paperlief.com/images/purple-color-gradient-wallpaper-1.jpg',  //deep blue
		'http://marcialmiller.com/wordpress/wp-content/uploads/2011/01/AllPatternBlockDesignbyBen-300x266.jpg',
		'http://marcialmiller.com/wordpress/wp-content/uploads/2011/01/Rowof5Hexagons-300x137.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhtR1BhDwTew8S7AJcbI94v0UFv2pjXwt2kdsqBSxfcgi8uObLg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-cxQe9A6rZsR8JUE_zJwX5S94nVXyaIy1H6NyhTNw1S_sv-P',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhyI_kI_Xaw_-a-MRTYeFpVWGlS9-zrP-mdDl_XTPh71wGuV6Mw',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3pJbHeAoIHUlC3DUS38TW-hYjPrEgid6HSrg-nNnT0JFz-eqyA',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZKIBvxb64CAuTASJHnrBzqyX_v_QwmJORswtVHC9vU-gvi9JlA',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRq-OXCzPXuuxEGABGb3yK1qUeSxPMIBKtzimgUMGKUipjQZztw',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIkwu2oXo3ZV5VpHJs0BP32y78wQyuts-GBuLcs4PgEqa03SJ0uw',
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONTF91XqYYCUUD8bQFRnRouMRq4Lxp7h0PijXJMpkkjT4Djb0sQ',  //bricks
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgoIVKj2tvvrwKirnEvLIVp7XEE2VpyEB4HVpAopp6p-Jvppe',
		'https://i0.wp.com/www.citiefy.com/wp-content/uploads/2016/04/Background_47-01-e1459829663432.jpg?fit=450%2C337', // samsung
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdfBdh9TMh6MZfwbE3gkcyum_qeAv4t0QQ6zRGqGbJAJlWo_P',   //blue
		'https://img00.deviantart.net/6ad0/i/2008/122/9/8/colorful_gradients_by_scientiaofborg.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyBNgb1If2M5s5u4Eqie-8BnC3D4q3ZgEirc8fXwBtUKiy96E-w',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSka_Yl4YtYQWSz2T5l64Z9LeVJwdH_LoctsnU_lXZ_BbmDVBka',  //sea
		'http://notgoaway.com/wp-content/uploads/2017/08/Orange-Wallpaper-158-Go.jpg',  //orange
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvD8MhkqMhnTziRDDqKmVWvwP2YrZ3Qk55TPs7oxP_DTwYYNrBg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekHPENYuvbwRmIXKoff5JHA1z3vC_XoAwbVXGgyCRE8uX6f26',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiLABN0zBTJV8kVyBdef307WbrYkANbnLa03aWcjZ9Dj2l8cL',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjMtl9M8g5BwuOBIWTWCcAVJFLeiGWifLEYl8i2JakRBXXZto',
		'https://st2.depositphotos.com/4724153/11516/v/950/depositphotos_115160878-stock-illustration-vector-hand-drawn-pattern-for.jpg', //fml portrait
		
		
		 
	    //'https://i.pinimg.com/originals/08/58/d6/0858d6df28c34239fe8e0077e19be750.png',  //cash
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQvp8gXVXK0Vb7ctlANuwugGW13OTnAWqriztJUGoBRXd0CXK8',    //blue
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDxrC1c4GaaJmBlciFeUZ8bsHheWefJXbGiUOFYOnXR5oGrVhAg',  //steel
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJTFmh8ur7hPYFn543z7OnYh1Kv3d51AQWWFiPDjJH8Bm7O3K',    //blue 2
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcDV5NdKfWnGR_cnEIO-iT-3hX_HtEpgPv5OFIhG3-Kgt_4Z0',    //green
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZi0cgMZX4iIJRbOXYZhmzPvKVXdWM8gMSFII6VKtKJlaHEBBs8Q',    //
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS4eUvBUEqNvtTWJqe2n0j-LrZZHpXMCLRII8gBdj66J8yyg_h',     //steel
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMuDL_pJKTnIt9lWX7WxiXdQOD7pg0TMXHdS5opQixcod3IbozDQ',   // white color
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mN6UajC1pXOOJ11DW1OKLL-X8tZ_0LzIuw3axNFgt2veGffesw',    //very color
		'https://thumbs.dreamstime.com/z/sunny-seamless-pattern-yellow-orange-sun-shapes-blue-background-34440134.jpg',      //patt blue
		'https://rfclipart.com/image/preview/34-00-e9/seamless-color-hand-drawn-sunny-pattern-Download-Royalty-free-Vector-File-EPS-153192.jpg', //mandala
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0QY9pg43mzXhjbmW_N6p7ztO1R8ztK6cU8bx3Np6e-Pn8IJwRA',  //rain
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8cHzsOjY4rCNqAdG4jUJY0VseU4_3IsB5QRwNuRGJk5ed5Awtg',  //rain2
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRMbAKCXIwpkaYHqS2pPDSqWz1ko9t8uqTTfrJGFdZHciymtu',   //thunder
		'http://www.proactivedental.com.au/wp-content/uploads/2015/10/girl-248x300.png',   //fml
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEPWGOzxTXCXYCBi4WajukuQQ7Q7PlOA-FGzQsKV_cxjT2fPvxw', //sunset
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPIBUy2Ru9gOD3vJUrRnWqCojmEftftOM0K_WvmW6fi70MDAl8',  //search
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwOeUhq4-8t_xS98RZyj6Atk-tWNIXiZphHolDpusOAAj607S', //road
		
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1OpSRjwhd0nyJcTZYZ6lUo4v46eYVpZkSJgOizuVk0ldeFffg', //islam
		//'https://banner2.kisspng.com/20180308/oze/kisspng-islamic-architecture-motif-pattern-islamic-traditional-decorative-patterns-5aa104eb92d7b2.2841900615205019956015.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsQ04RfZT4vWwxrfTCXuBAmeG6YSpzJZtT-bPhVbxj9u0CfyZ',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_GlZLlJCAW4mXLKNOqvVEs8NdUOalVbzGdl9Sdwnf-wpapp7Jg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXycguf1VLYxNuHJ_Vp0ynyEYCrn0tI76jl4fRCrnfGpod3UzWzQ',
		'http://www.wallpaper-box.com/smartphone/wp-content/uploads/2014/09/Colorful-abstract-wallpaper-433x191.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbzFbadouFp0oi4agez0lv9En7GPsGyQE1G_bXQX085b7X_pfkFg',
		'http://getdrawings.com/image/space-drawing-56.jpg',         //space-drawing-56
		//'http://getdrawings.com/images/space-drawing-3.jpg',        //space black white
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsI5s1TRhYvyua-35eDL5XbPiU3VLH9Kp15hVZECaZRheH2bVH',
		'https://d298hcpblme28l.cloudfront.net/product-lg/0ef1de67e9bf4a860e954aa3b1e2bad1.jpg',                  //space black
		'https://png.pngtree.com/element_origin_min_pic/17/08/19/0dffc570d4ae2954f3b949e5868fd774.jpg',          // star sky
		//'https://www.wpclipart.com/textures/floral/floral_seamless_pattern_green.png',           //green
		'https://banner2.kisspng.com/20180226/vzw/kisspng-coffee-green-tea-cafe-matcha-green-coffee-shop-pattern-5a94b3d232f101.3641932715196948022087.jpg',  //green cattle
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbHoI7xYqlWr1zZAtoA1tAalUJaPixTnAvZdr95QD4IKCjou3',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FtYsBBt6wS_Lx7mx3BeEtIKgIn30fyJXHCPkBXzUHKrrDvastQ',
		'https://repperpatterns.com/www/wp-content/uploads/2010/11/MWM_pattern_tile_6-558x558.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRECg7KSDri3xJSW01qbtMzRWZNt_TQzrL1d-sZ3TT5rIl8wCnW',
		'http://lenapechamberensemble.org/wp-content/uploads/2017/08/blue-pattern-background-photos-free-landscape-1920x1080.jpg', //main
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SdcsdwHeRnkC6tFXIQ-2RxvVA5EAXL0oOKvZzDzFFOU-OrdXeQ',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pPLLyGTTLw4NmySGqEmxLqJH2SnR7VKVbO0JSP-ECA7HfNRc',
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpuzE-XYHgupP4_IMvlmNq1V497cgDDWC-YserhOiulHvMldM', //smiles
		'https://image.freepik.com/free-vector/green-flowers-pattern-background_1217-148.jpg',
		'https://naldzgraphics.net/wp-content/uploads/2014/09/Free-Fractal-Patterns.jpg',  //fracral
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZSNkPSqE-hmJdM_MZV0Sa-QWXnC3uvYwbdTG1q0vrTxU3OApM',
		'https://pre00.deviantart.net/ec44/th/pre/f/2015/071/c/2/fractal_pattern_3_by_nic022-d8ldvzx.jpg', //fracral grey
		'http://www.fractalsciencekit.com/fractals/small/Fractal-Julia-Pattern-Map-69.jpg',  //fractal blue
		'http://www.fractalsciencekit.com/fractals/small/Fractal-Julia-Pattern-Map-73.jpg',  //fractal grey
		'http://www.fractalsciencekit.com/fractals/small/Fractal-Julia-Pattern-Map-63.jpg',
		'http://www.fractalsciencekit.com/fractals/small/Fractal-Julia-Pattern-Map-61.jpg',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbxKesoUoiNgk2TAODQmVJoefy_lxkZ6ZjmOjmysO86GCLqwJ',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBhwXqhpym9ERAW4TFayPTk1Gdd3bct7NnATfxgGIKxPrkU-oB',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0q4G1wnP3MazNn7u8lY8gVU3C4A8FwQSiOHkvC1RJB5ZQqRb4Q',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW417ozC4rmNrHPYnf5yT6ubKJGX0VERWJIK-oMthcozvQ2l3C', // flowers-pattern-background_1217-148
		//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5CEb0aWO3PNsjIB8_LtLtMU_KG-YhLlBcMe8k9BnFIsTZH0e-w', //tree
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgKP-lul4CuoNj78r4dH7UVS_Zx2uSQnStT5osSCSph7f9B1aaQ',  //cats
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUaNW2Q5e45JnD0ynSXD88RBnPWqPn9Z5vuxHGQtRAsKPuQGtMA', //dnb
		'http://notgoaway.com/wp-content/uploads/2017/08/Orange-Wallpaper-158-Go.jpg',  //orange
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHZrLrBJz2DPTgn82fq_c6_pFN9vj-0ABd7uzO8-aQ83HW-26', //text
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsQf2-zwuStKf6u2V2HE_nCy9rRvk5M8ag043FAenQbOrCXY3tA', // violet WEATHER MAIN
		'https://www.welovesolo.com/wp-content/uploads/vector/46/Pattern-word-cloud-creative-vector-07.jpg',  //text 3
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHbhzuoJFsUlWKBKqGRtReqUAcWg6TbphM3BPEzeQDJa-sqfl6',  //violet
		'',  //EMPTY
   ];
   
	
	
	
	
	// Click to change theme
	$("#changeStyle").click(function() {   
	    changeBGColor();   
	}); 
	
	
	var counter = 0;
	
	function changeBGColor() {
		if((counter + 1) == wallURL.length){  //if counter == array length , {+1 as counter starts with 0}
			counter = 0;
		} else {
		counter++;
		}
		
        var cols = document.getElementsByClassName('head-style');
        for(i=0; i<cols.length; i++) {
            cols[i].style.backgroundImage = 'url(' + wallURL[counter] + ')';
      
        }
     }



});
// end ready	